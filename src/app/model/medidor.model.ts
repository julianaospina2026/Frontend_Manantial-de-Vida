export interface Medidor {
    id?: number;
    serial: string;
    marca: string;
    fechaInstalacion: string; // ISO string, p.ej. 2026-06-03
    estado: 'NUEVO' | 'USADO' | 'DAÑADO' | string;
    cliente?: {
    id?: number;
    nombre?: string;
};
}
