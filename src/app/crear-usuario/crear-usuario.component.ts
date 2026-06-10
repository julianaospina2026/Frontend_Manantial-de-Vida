import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {

  usuario = {
    username: '',
    email: '',
    cedula: '',
    password: '',
    nombreCompleto: '',
    activo: true,
    rol: {
      id: 4
    }
  };

  constructor(private http: HttpClient) {}

  guardarUsuario(): void {

    if (
      !this.usuario.nombreCompleto ||
      !this.usuario.cedula ||
      !this.usuario.email ||
      !this.usuario.username ||
      !this.usuario.password
    ) {
      alert('Terminar de llenar los campos');
      return;
    }

    this.http.post(
      'http://localhost:8080/api/usuarios',
      this.usuario
    ).subscribe({

      next: (respuesta) => {

        console.log('Usuario creado', respuesta);

        alert('Usuario creado correctamente');

        this.usuario = {
          username: '',
          email: '',
          cedula: '',
          password: '',
          nombreCompleto: '',
          activo: true,
          rol: {
            id: 4
          }
        };
      },

      error: (error) => {
        console.error(error);
        alert('Error al crear usuario');
      }
    });
  }
}