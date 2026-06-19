export interface Financiacion {
  id: number;

  montoTotal: number;

  cuotasTotales: number;

  cuotasPagadas: number;

  valorCuota: number;

  concepto: string;

  fechaInicio?: string;

  cliente?: {
    id: number;
  };
}