export interface FinanciacionRequest {
  cliente: {
    id: number;
  };
  montoTotal: number;
  cuotasTotales: number;
  concepto: string;
  valorCuota: number;
}