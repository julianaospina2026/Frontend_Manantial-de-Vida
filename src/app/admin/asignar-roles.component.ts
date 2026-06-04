import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { Rol } from '../model/rol.model';
import { UsuarioService } from '../service/usuario.service';
import { RolService } from '../service/rol.service';

@Component({
  selector: 'app-asignar-roles',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.scss']
})
export class AsignarRolesComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {
    this.form = this.fb.group({
      usuarioId: [null],
      rolId: [null]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  cargarRoles(): void {
    this.rolService.listar().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error cargando roles', err)
    });
  }

  asignar(): void {
    const usuarioId = this.form.value.usuarioId;
    const rolId = this.form.value.rolId;
    if (!usuarioId || !rolId) {
      this.error = 'Selecciona un usuario y un rol.';
      return;
    }
    const usuario = this.usuarios.find((u) => u.id === usuarioId);
    const rol = this.roles.find((r) => r.id === rolId);
    if (!usuario || !rol) {
      this.error = 'Usuario o rol inválido.';
      return;
    }
    const actualizado = { ...usuario, rol } as Usuario;
    this.usuarioService.actualizar(usuarioId, actualizado).subscribe({
      next: () => {
        this.mensaje = `Rol ${rol.nombre} asignado a ${usuario.username}.`;
        this.error = '';
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error asignando rol', err);
        this.error = 'No se pudo asignar el rol. Intenta de nuevo.';
        this.mensaje = '';
      }
    });
  }
}
