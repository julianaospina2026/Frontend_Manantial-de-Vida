import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  // 🔴 CAMBIA ESTA URL POR LA TUYA REAL DEL BACKEND
  private apiUrl = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) {}

  // =========================
  // 📄 OBTENER TODAS LAS FACTURAS (HISTORIAL)
  // =========================
  getAllFacturas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // =========================
  // 📄 OBTENER FACTURA POR ID (DETALLE)
  // =========================
  getFacturaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // =========================
  // 📄 CREAR FACTURA (si lo usas)
  // =========================
  crearFactura(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  // =========================
  // 📄 BUSCAR POR NÚMERO DE FACTURA (OPCIONAL BACKEND)
  // =========================
  buscarPorNumero(numero: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?numero=${numero}`);
  }
}