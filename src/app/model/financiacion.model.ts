export interface Financiacion {
    id?: number;
    clienteId: number;
    montoTotal: number;
    numeroCuotas: number;
    estado?: string; // PENDIENTE, ACTIVA, FINALIZADA
    fechaCreacion?: string;
}