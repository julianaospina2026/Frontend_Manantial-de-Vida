import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    errorMessage = '';

onSubmit(loginValue: string, password: string): void {
    const value = loginValue.trim();
    const passwordValue = password.trim();
    this.errorMessage = '';

    if (!value || !passwordValue) {
        this.errorMessage = 'Debes ingresar correo o cédula y contraseña.';
        return;
    }

    // Llamar al backend para autenticar
    this.authService.login({ username: value, password: passwordValue }).subscribe({
        next: (response) => {
        const role = response.role?.toLowerCase() || 'user';
        const currentUser = {
            role,
            email: value.includes('@') ? value.toLowerCase() : undefined,
            documento: value.includes('@') ? undefined : value,
            token: response.token,
            profile: response
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        if (role === 'admin') {
            this.router.navigate(['/admin']);
            return;
        }
        if (role === 'operator' || role === 'operador') {
            this.router.navigate(['/operador']);
            return;
        }

        this.router.navigate(['/portal-usuario']);
    },
    error: (error) => {
        this.errorMessage = error?.error?.message || 'Credenciales incorrectas o el backend no respondió.';
    }
    });
}
}
