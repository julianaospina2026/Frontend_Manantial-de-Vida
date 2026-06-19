import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  errorMessage: string = '';

  onSubmit(loginValue: string, password: string): void {

    const identificacion = loginValue?.trim();
    const passwordValue = password?.trim();

    if (!identificacion || !passwordValue) {
      this.errorMessage = 'Completa los campos';
      return;
    }

    this.authService.login({
      identificacion,
      password: passwordValue
    }).subscribe({

      next: (response: any) => {

        console.log('LOGIN RESPONSE:', response);

        const role = (
          response.rol ||
          response.role ||
          ''
        ).toUpperCase();

        console.log('ROL RECIBIDO:', role);

        const currentUser = {
          role,
          clienteId: response.clienteId ?? null,
          profile: response
        };

        localStorage.setItem(
          'currentUser',
          JSON.stringify(currentUser)
        );

        switch (role) {

          case 'ADMINISTRADOR':
            this.router.navigate(['/administrador/panel']);
            break;

          case 'OPERADOR':
            this.router.navigate(['/operador']);
            break;

          case 'PRESIDENTE':
            this.router.navigate(['/presidente']);
            break;

          case 'USUARIO':
            this.router.navigate(['/portal-usuario']);
            break;

          default:
            console.warn('Rol no reconocido:', role);
            this.router.navigate(['/inicio']);
            break;
        }
      },

      error: (err) => {

        console.error('LOGIN ERROR:', err);

        this.errorMessage =
          err?.error?.message ||
          'Error de login o servidor no disponible';
      }
    });
  }
}