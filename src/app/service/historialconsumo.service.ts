import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lectura } from '../model/lectura.model';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class HistorialConsumoService {
    private apiUrl = `${environment.apiUrl}/historial-consumo`;
    
    constructor(private http: HttpClient) {}

obtenerPorCliente(clienteId: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/cliente/${clienteId}`);
}
}