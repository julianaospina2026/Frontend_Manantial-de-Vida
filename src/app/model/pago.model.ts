export interface Pago {
  id?: number;
  facturaId: number;
  monto: number;
  fechaPago: string;
  metodoPago: string; // EFECTIVO, PSE, TARJETA
}