export interface Lectura {
  id?: number;
  clienteId?: number;
  clienteNombre?: string;
  medidorSerial?: string;
  fechaProgramada?: string; // ISO
  estado?: 'PENDIENTE' | 'REALIZADA' | string;
  lecturaAnterior?: number;
  lecturaActual?: number;
  facturaUrl?: string; // URL para descargar/visualizar factura
}

export interface LecturaPage {
  content: Lectura[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
