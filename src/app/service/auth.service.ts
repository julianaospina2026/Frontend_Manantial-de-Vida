import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ========================
  // URL CORRECTA DEL BACKEND
  // ========================
  private readonly baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  // ========================
  // LOGIN
  // ========================
  login(data: {
    identificacion: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // ========================
  // SESIÓN ACTIVA
  // ========================
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // ========================
  // USUARIO ACTUAL
  // ========================
  getUser(): any {
    const raw = localStorage.getItem('currentUser');

    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error('Error leyendo currentUser', error);
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  // ========================
  // ROL
  // ========================
  getRole(): string {
    const user = this.getUser();

    const role =
      user?.role ??
      user?.rol ??
      user?.profile?.role ??
      user?.profile?.rol ??
      '';

    return (role || '').toString().trim().toUpperCase();
  }

  // ========================
  // CLIENTE ID
  // ========================
  getClienteId(): number | null {
    const user = this.getUser();

    const id =
      user?.clienteId ??
      user?.cliente?.id ??
      user?.profile?.clienteId ??
      user?.profile?.cliente?.id ??
      null;

    return id ? Number(id) : null;
  }

  // ========================
  // VALIDAR SESIÓN COMPLETA
  // ========================
  isAuthenticated(): boolean {
    return this.isLoggedIn() && this.getRole() !== '';
  }

  // ========================
  // LOGOUT
  // ========================
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}