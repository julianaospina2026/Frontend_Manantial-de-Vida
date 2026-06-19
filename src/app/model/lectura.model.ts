import { Cliente } from './clientes.model';

export interface Lectura {

  id?: number;

  cliente?: Cliente;   // 👈 AQUÍ está la corrección

  periodo?: string;

  fechaLectura?: string;

  lecturaAnterior?: number;

  lecturaActual?: number;

  consumoM3?: number;

  valor?: number;

  observacion?: string;
}