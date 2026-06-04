import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../model/pago.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HistorialPagosService {
  private apiUrl = `${environment.apiUrl}/historial-pagos`;

  constructor(private http: HttpClient) {}

  obtenerPagosCliente(clienteId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }
}