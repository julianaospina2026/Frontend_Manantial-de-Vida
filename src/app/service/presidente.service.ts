import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PresidenteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard principal
  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/presidente/dashboard`);
  }

  // Todas las lecturas
  getLecturas(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/presidente/lecturas`
    );
  }

  // Todos los pagos
  getPagos(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/presidente/pagos`
    );
  }

  // Historial de lecturas por cliente
  getHistorial(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/presidente/historial/${clienteId}`
    );
  }
}