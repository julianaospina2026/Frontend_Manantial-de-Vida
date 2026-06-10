import { Rol } from './rol.model';

export interface Usuario {
    id?: number;

    username: string;
    password?: string;

    email: string;
    cedula: string;
    nombreCompleto: string;

    activo: boolean;

    rol: Rol;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface PageUsuario {
    content: Usuario[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}