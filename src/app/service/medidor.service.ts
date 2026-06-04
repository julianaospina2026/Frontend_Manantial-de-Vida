
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medidor } from '../model/medidor.model';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class MedidorService {
    private baseUrl = `${environment.apiUrl}/medidores`;
    
    constructor(private http: HttpClient) {}

    listarMedidores(): Observable<Medidor[]> {
        return this.http.get<Medidor[]>(this.baseUrl);
    }

    obtenerPorSerial(serial: string): Observable<Medidor> {
        return this.http.get<Medidor>(`${this.baseUrl}/${encodeURIComponent(serial)}`);
    }

    crearMedidor(medidor: Medidor): Observable<Medidor> {
        return this.http.post<Medidor>(this.baseUrl, medidor);
    }
}
