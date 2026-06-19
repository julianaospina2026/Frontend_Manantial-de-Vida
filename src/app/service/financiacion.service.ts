import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environments';
import { Financiacion } from '../model/financiacion.model';
import { FinanciacionRequest } from '../model/financiacion-request.model';

@Injectable({
  providedIn: 'root'
})
export class FinanciacionService {

  private apiUrl = `${environment.apiUrl}/financiaciones`;

  constructor(private http: HttpClient) {}

  // =========================
  // CREAR FINANCIACIÓN
  // =========================
  crear(financiacion: FinanciacionRequest): Observable<Financiacion> {
    return this.http.post<Financiacion>(this.apiUrl, financiacion);
  }

  // =========================
  // LISTAR POR CLIENTE
  // =========================
  listarPorCliente(clienteId: number): Observable<Financiacion[]> {
    return this.http.get<Financiacion[]>(
      `${this.apiUrl}/cliente/${clienteId}`
    );
  }
}