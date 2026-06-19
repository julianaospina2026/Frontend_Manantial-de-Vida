import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface ResumenDashboard {
  users: number;
  paymentsToday: number;
  pendingInvoices: number;
  tomorrowShifts: number;
}

export interface Pago {
  factura?: any;
  fechaPago?: string;
  estado?: string;
  monto?: number;
}

export interface Factura {
  cliente?: any;
  fecha?: string;
  estado?: string;
  total?: number;
}

export interface Turno {
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