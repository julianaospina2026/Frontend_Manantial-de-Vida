export interface Cliente {

    id?: number;

    codigoCliente: string;

    documentoIdentidad?: number;

    nombre: string;

    apellido: string;

    direccion: string;

    zona?: string;

    vereda?: string;

    telefono: string;

    correo?: string;

    estrato: number;

    estado: string;

    lecturaMedidor?: number;

    fechaRegistro?: string;
}