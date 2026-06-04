import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) {}

  obtenerRecaudoMes(periodo: string): Observable<any> {
    const params = new HttpParams().set('periodo', periodo);
    return this.http.get(`${this.apiUrl}/recaudo-mes`, { params });
  }

  contarClientesEnMora(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/clientes-morosos`);
  }
}