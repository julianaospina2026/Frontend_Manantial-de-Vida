
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

  listarPendientes(): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/pendientes`);
  }

  listarPorUsuario(username: string): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/usuario/${encodeURIComponent(username)}`);
  }

  marcarRealizada(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/marcar-realizada`, {});
  }

  obtenerFactura(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/factura`, { responseType: 'blob' });
  }
}
