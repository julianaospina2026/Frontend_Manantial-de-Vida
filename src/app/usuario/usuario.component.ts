import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../model/usuario.model';
import { Rol } from '../model/rol.model';
import { UsuarioService } from '../service/usuario.service';
import { RolService } from '../service/rol.service';

@Component({
    selector: 'app-usuario',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
    usuarios: Usuario[] = [];
    roles: Rol[] = [];
    mensaje = '';
    error = '';
    filtroUsername = new FormControl('', { nonNullable: true });
    editandoId: number | null = null;
    estados = ['ACTIVO', 'INACTIVO'];

    private readonly fb = inject(FormBuilder);

    readonly form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        passwordHash: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', Validators.required],
        estado: ['ACTIVO', Validators.required],
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

    get rolesDisponibles(): Rol[] {
        return this.roles;
    }

    private inicializarUsuario(): Usuario {
        return {
            username: '',
            passwordHash: '',
            email: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            estado: 'ACTIVO',
            rol: { id: 0, nombre: '' }
        };
    }

    cargarUsuarios(): void {
        this.usuarioService.listar().subscribe(data => {
            this.usuarios = data;
        });
    }

    cargarRoles(): void {
        this.rolService.listar().subscribe(data => {
            this.roles = data;
        });
    }

    buscarPorUsername(): void {
        const username = this.filtroUsername.value.trim();

        if (!username) {
            this.cargarUsuarios();
            return;
        }

        this.usuarioService.buscarPorUsername(username).subscribe({
            next: usuario => {
                this.usuarios = usuario ? [usuario] : [];
            },
            error: () => {
                this.usuarios = [];
                this.error = 'No se encontró ningún usuario con ese username';
            }
        });
    }

    limpiarBusqueda(): void {
        this.filtroUsername.setValue('');
        this.error = '';
        this.cargarUsuarios();
    }

    iniciarEdicion(usuario: Usuario): void {
        this.editandoId = usuario.id ?? null;
        this.form.patchValue({
            username: usuario.username,
            passwordHash: usuario.passwordHash,
            email: usuario.email,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            telefono: usuario.telefono,
            estado: usuario.estado,
            rol: usuario.rol
        });
    }

    cancelarEdicion(): void {
        this.editandoId = null;
        this.error = '';
        this.mensaje = '';
        this.form.reset({
            username: '',
            passwordHash: '',
            email: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            estado: 'ACTIVO',
            rol: null
        });
    }

    compararRoles(o1: Rol, o2: Rol): boolean {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    }

    guardar(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const raw = this.form.getRawValue();
        const payload: Usuario = {
            username: raw.username,
            passwordHash: raw.passwordHash,
            email: raw.email,
            nombres: raw.nombres,
            apellidos: raw.apellidos,
            telefono: raw.telefono,
            estado: raw.estado,
            rol: raw.rol!
        };

        if (this.editandoId != null) {
            this.usuarioService.actualizar(this.editandoId, payload).subscribe({
                next: () => {
                    this.mensaje = 'Usuario actualizado correctamente';
                    this.cancelarEdicion();
                    this.cargarUsuarios();
                },
                error: () => {
                    this.error = 'No se pudo actualizar el usuario';
                }
            });
            return;
        }

        this.usuarioService.crear(payload).subscribe({
            next: () => {
                this.mensaje = 'Usuario creado correctamente';
                this.form.reset({
                    username: '',
                    passwordHash: '',
                    email: '',
                    nombres: '',
                    apellidos: '',
                    telefono: '',
                    estado: 'ACTIVO',
                    rol: null
                });
                this.cargarUsuarios();
            },
            error: () => {
                this.error = 'No se pudo crear el usuario';
            }
        });
    }

    eliminar(id: number | undefined): void {
        if (id === undefined) {
            this.error = 'ID de usuario inválido';
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
}
