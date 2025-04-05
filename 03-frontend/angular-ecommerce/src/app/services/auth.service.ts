import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined') {
      this.isLoggedInSubject.next(this.hasToken());
    }
  }

  login(credentials: {email: string; password: string}): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: {firstName: string; lastName: string; email: string; password: string}): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    if(typeof window !== 'undefined') {
      return localStorage.getItem('token');

    }
    return null;
  }

  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  private hasToken(): boolean {
    if(typeof window === 'undefined') {
      return false;
    }
    return  !!localStorage.getItem('token');
  }
  
}
