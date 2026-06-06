import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credentials).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
  }

  getRole(): string {
    const userRaw = localStorage.getItem('currentUser');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const role = user?.rol?.nombre || user?.role || '';
    return role.toUpperCase();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}