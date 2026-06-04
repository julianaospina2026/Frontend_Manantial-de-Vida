import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuotaFinanciacion } from '../model/cuotafinanciacion.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CuotaFinanciacionService {
  private apiUrl = `${environment.apiUrl}/cuotas-financiacion`;

  constructor(private http: HttpClient) {}

  listarPorFinanciacion(financiacionId: number): Observable<CuotaFinanciacion[]> {
    return this.http.get<CuotaFinanciacion[]>(`${this.apiUrl}/financiacion/${financiacionId}`);
  }

  pagarCuota(id: number): Observable<CuotaFinanciacion> {
    return this.http.patch<CuotaFinanciacion>(`${this.apiUrl}/${id}/pagar`, {});
  }
}