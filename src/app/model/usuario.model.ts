import { Rol } from './rol.model';

export interface Usuario {
    id?: number;
    username: string;
    passwordHash: string;
    email: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    estado: string;
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