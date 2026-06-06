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
            this.errorMessage =
                'Debes ingresar correo/cédula y contraseña.';
            return;
        }

        this.authService.login({
            username: value,
            password: passwordValue
        }).subscribe({

            next: (response) => {

                console.log('RESPUESTA LOGIN:', response);
                console.log('ROL REAL:', response.rol?.nombre);

                // 🔥 normalizar rol (IMPORTANTE)
                const role = response.rol?.nombre?.toLowerCase().trim();

                // guardar sesión
                const currentUser = {
                    role,
                    email: response.email || (value.includes('@') ? value.toLowerCase() : undefined),
                    documento: value.includes('@') ? undefined : value,
                    profile: response
                };

                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // 🔥 redirección por rol
                if (role === 'administrador') {
                    this.router.navigate(['/administrador/panel']);
                    return;
                }

                if (role === 'operador') {
                    this.router.navigate(['/operador']);
                    return;
                }

                if (role === 'presidente') {
                    this.router.navigate(['/presidente']);
                    return;
                }

                this.router.navigate(['/portal-usuario']);
            },

            error: (error) => {
                console.error('ERROR LOGIN:', error);

                this.errorMessage =
                    error?.error?.message ||
                    'Credenciales incorrectas o el backend no respondió.';
            }
        });
    }
}