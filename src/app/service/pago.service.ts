import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../model/pago.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) {}

  registrarPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  obtenerPagosPorFactura(facturaId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/factura/${facturaId}`);
  }
}