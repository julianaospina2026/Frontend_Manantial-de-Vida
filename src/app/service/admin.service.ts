import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


// =======================
// DASHBOARD
// =======================
export interface ResumenDashboard {
  users: number;
  paymentsToday: number;
  pendingInvoices: number;
  tomorrowShifts: number;
}


// =======================
// PAGOS (alineado con backend)
// =======================
export interface Pago {
  id?: number;
  factura?: {
    id?: number;
    cliente?: {
      id?: number;
      nombre?: string;
    };
  };
  fechaPago?: string;
  estado?: string;
  monto?: number;
}


// =======================
// FACTURAS (CORREGIDO con Java)
// =======================
export interface Factura {
  id?: number;
  cliente?: {
    id?: number;
    nombre?: string;
  };
  fechaEmision?: string;   // ✔ antes era "fecha"
  estado?: string;
  totalPagar?: number;     // ✔ antes era "total"
}


// =======================
// TURNOS
// =======================
export interface Turno {
  id?: number;
  dia?: string;
  operador?: string;
  hora?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =======================
  // DASHBOARD
  // =======================
  getResumenDashboard(): Observable<ResumenDashboard> {
    return this.http.get<ResumenDashboard>(
      `${this.apiUrl}/dashboard/summary`
    );
  }

  // =======================
  // PAGOS
  // =======================
  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.apiUrl}/pagos`
    );
  }

  // =======================
  // FACTURAS
  // =======================
  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(
      `${this.apiUrl}/facturas`
    );
  }

  // =======================
  // TURNOS
  // =======================
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(
      `${this.apiUrl}/turnos`
    );
  }
}