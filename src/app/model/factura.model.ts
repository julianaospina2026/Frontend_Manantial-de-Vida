export interface FacturaLectura {
  id?: number;
  cliente?: {
    id?: number;
    nombre?: string;
    apellido?: string;
    documento?: string;
  };
  medidorSerial?: string;
}

export interface Factura {
  id?: number;
  lectura?: FacturaLectura;
  fechaEmision?: string;
  fechaVencimiento?: string;
  valorConsumo?: number;
  cargoFijo?: number;
  otrosCobros?: number;
  totalPagar?: number;
  estado?: 'PENDIENTE' | 'PAGADA' | 'ANULADA' | string;
}
