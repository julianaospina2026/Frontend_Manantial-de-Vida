import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Financiacion } from '../model/financiacion.model';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class FinanciacionService {
    private apiUrl = `${environment.apiUrl}/financiaciones`;

    constructor(private http: HttpClient) {}
    
    crear(financiacion: Financiacion): Observable<Financiacion> {
    return this.http.post<Financiacion>(this.apiUrl, financiacion);
}

listarPorCliente(clienteId: number): Observable<Financiacion[]> {
    return this.http.get<Financiacion[]>(`${this.apiUrl}/cliente/${clienteId}`);
}
}