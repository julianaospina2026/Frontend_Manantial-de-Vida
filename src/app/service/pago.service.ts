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

  // =====================================================
  // 1. REGISTRAR PAGO
  // =====================================================
  registrarPago(pago: Pago): Observable<any> {
    return this.http.post<any>(this.apiUrl, pago);
  }

  // =====================================================
  // 2. PAGOS POR FACTURA
  // =====================================================
  obtenerPagosPorFactura(facturaId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.apiUrl}/factura/${facturaId}`
    );
  }

  // =====================================================
  // 3. DESCARGAR RECIBO PDF
  // =====================================================
  descargarRecibo(facturaId: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/recibo/${facturaId}`,
      {
        responseType: 'blob'
      }
    );
  }

  // =====================================================
  // 4. ENVIAR RECIBO POR CORREO (FALTABA - ERROR TS2339)
  // =====================================================
  enviarRecibo(facturaId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/facturas/${facturaId}/enviar-recibo`,
      {}
    );
  }
}