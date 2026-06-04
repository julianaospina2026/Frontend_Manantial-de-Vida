export interface Turno {
  id?: number;
  clienteId: number;
  fecha: string;
  motivo: string;
  estado: string; // PENDIENTE, ATENDIDO, CANCELADO
  observaciones?: string;
}