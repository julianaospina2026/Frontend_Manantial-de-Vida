import { Cliente } from './clientes.model';

export interface FacturaLectura {
  id?: number;

  cliente?: Cliente;

  medidorSerial?: string;

  periodo?: string;

  fechaLectura?: string;

  lecturaAnterior?: number;

  lecturaActual?: number;

  consumoM3?: number;   // 🔥 ESTE ES EL QUE TE FALTABA

  observacion?: string;

  valor?: number;
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
  estado?: 'PENDIENTE' | 'PAGA' | 'ANULADA' | string;
}