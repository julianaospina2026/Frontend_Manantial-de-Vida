export interface CuotaFinanciacion {
  id?: number;
  financiacionId: number;
  numeroCuota: number;
  monto: number;
  fechaVencimiento: string;
  pagada: boolean;
}