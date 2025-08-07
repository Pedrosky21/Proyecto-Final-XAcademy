import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  constructor(private readonly http: HttpClient) {}

  private setLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string; user: any }> {
    return this.http
      .post<{ token: string; user: any }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.setLocalStorageItem('token', response.token);
          this.setLocalStorageItem('user', JSON.stringify(response.user));
        })
      );
  }

  getLoggedInUser(): any {
    const userJson = this.getLocalStorageItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  getToken(): string | null {
    return this.getLocalStorageItem('token');
  }

  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }
}
