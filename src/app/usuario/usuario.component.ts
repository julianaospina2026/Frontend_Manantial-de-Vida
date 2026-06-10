import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Usuario } from '../model/usuario.model';
import { Rol } from '../model/rol.model';
import { UsuarioService } from '../service/usuario.service';
import { RolService } from '../service/rol.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];

  mensaje = '';
  error = '';

  filtroUsername = new FormControl('', { nonNullable: true });

  editandoId: number | null = null;

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', Validators.required],
    nombreCompleto: ['', Validators.required],
    activo: [true],
    rol: [null as Rol | null, Validators.required]
  });

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  // ==========================
  // 🔹 CARGAS INICIALES
  // ==========================

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data || [];
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios';
      }
    });
  }

  cargarRoles(): void {
    this.rolService.listar().subscribe({
      next: (data) => {
        this.roles = data || [];
      },
      error: () => {
        this.error = 'No se pudieron cargar los roles';
      }
    });
  }

  // ==========================
  // 🔍 BUSCAR
  // ==========================

  buscarPorUsername(): void {

    const username = this.filtroUsername.value.trim();

    if (!username) {
      this.cargarUsuarios();
      return;
    }

    this.usuarioService.buscarPorUsername(username).subscribe({
      next: (usuario) => {
        this.usuarios = usuario ? [usuario] : [];
        this.mensaje = usuario ? 'Usuario encontrado' : '';
        this.error = usuario ? '' : 'No se encontró el usuario';
      },
      error: () => {
        this.usuarios = [];
        this.error = 'No se encontró ningún usuario';
        this.mensaje = '';
      }
    });
  }

  limpiarBusqueda(): void {
    this.filtroUsername.setValue('');
    this.resetMensajes();
    this.cargarUsuarios();
    this.cancelarEdicion();
  }

  // ==========================
  // ✏️ EDICIÓN
  // ==========================

  iniciarEdicion(usuario: Usuario): void {

    if (!usuario?.id) {
      this.error = 'Usuario inválido';
      return;
    }

    this.editandoId = usuario.id;

    this.form.patchValue({
      username: usuario.username,
      password: '',
      email: usuario.email,
      cedula: usuario.cedula,
      nombreCompleto: usuario.nombreCompleto,
      activo: usuario.activo,
      rol: usuario.rol
    });
  }

  cancelarEdicion(): void {

    this.editandoId = null;
    this.resetMensajes();

    this.form.reset({
      username: '',
      password: '',
      email: '',
      cedula: '',
      nombreCompleto: '',
      activo: true,
      rol: null
    });
  }

  compararRoles(o1: Rol, o2: Rol): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  // ==========================
  // 💾 GUARDAR (CREATE / UPDATE)
  // ==========================

  guardar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    const payload: Usuario = {
      username: raw.username,
      password: raw.password,
      email: raw.email,
      cedula: raw.cedula,
      nombreCompleto: raw.nombreCompleto,
      activo: raw.activo,
      rol: raw.rol!
    };

    // 🆕 CREAR
    if (this.editandoId === null) {

      this.usuarioService.crear(payload).subscribe({
        next: () => {
          this.mensaje = 'Usuario creado correctamente';
          this.cancelarEdicion();
          this.cargarUsuarios();
        },
        error: () => {
          this.error = 'No se pudo crear el usuario';
        }
      });

      return;
    }

    // ✏️ ACTUALIZAR
    this.usuarioService.actualizar(this.editandoId, payload).subscribe({
      next: () => {
        this.mensaje = 'Usuario actualizado correctamente';
        this.cancelarEdicion();
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo actualizar el usuario';
      }
    });
  }

  // ==========================
  // 🗑️ ELIMINAR
  // ==========================

  eliminar(id?: number): void {

    if (!id) {
      this.error = 'ID inválido';
      return;
    }

    if (!confirm('¿Seguro que deseas eliminar este usuario?')) {
      return;
    }

    this.usuarioService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Usuario eliminado correctamente';
        this.cargarUsuarios();
      },
      error: () => {
        this.error = 'No se pudo eliminar el usuario';
      }
    });
  }

  // ==========================
  // 🔧 UTILIDAD
  // ==========================

  private resetMensajes(): void {
    this.mensaje = '';
    this.error = '';
  }
}