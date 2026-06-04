import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../model/turno.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = `${environment.apiUrl}/turnos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  programar(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  actualizarEstado(id: number, estado: string): Observable<Turno> {
    const params = new HttpParams().set('estado', estado);
    return this.http.patch<Turno>(`${this.apiUrl}/${id}/estado`, null, { params });
  }
}