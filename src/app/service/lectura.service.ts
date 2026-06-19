import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lectura } from '../model/lectura.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  private apiUrl = `${environment.apiUrl}/lecturas`;

  constructor(private http: HttpClient) {}

  // =========================
  // LISTAR PENDIENTES
  // =========================
  listarPendientes(): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/pendientes`);
  }

  // =========================
  // LISTAR POR CLIENTE
  // =========================
  listarPorUsuario(clienteId: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  // (ELIMINÉ DUPLICADO listarPorCliente - no era necesario)

  // =========================
  // CREAR LECTURA (🔥 TE FALTABA ESTO)
  // =========================
  registrarLectura(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payload);
  }

  // =========================
  // MARCAR REALIZADA
  // =========================
  marcarRealizada(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/marcar-realizada`, {});
  }

  // =========================
  // FACTURA
  // =========================
  obtenerFactura(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/factura`, {
      responseType: 'blob'
    });
  }
}