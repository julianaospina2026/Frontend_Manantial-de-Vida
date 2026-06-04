import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lectura } from '../model/lectura.model';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class HistorialLecturaService {
    private apiUrl = `${environment.apiUrl}/historial-lecturas`;
    
    constructor(private http: HttpClient) {}

obtenerHistorial(id: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/cliente/${id}`);
}
}