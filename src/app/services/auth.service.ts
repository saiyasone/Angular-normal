import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000/api';
  private email!: string;
  private password!: string;

  token$ = new BehaviorSubject<string>('');
  userId$ = new BehaviorSubject<string>('');
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return this.token$.getValue();
  }
  get isAuthenticated() {
    return this.isAuthenticated$.getValue();
  }

  set setEmail(value: string) {
    this.email = value;
  }
  set setPassword(value: string) {
    this.password = value;
  }

  login(): Observable<any> {
    return this.http
      .post(this.url + '/auth/login', {
        email: this.email,
        password: this.password,
      })
      .pipe(
        tap((response) => {
          if (response) {
            this.handleAuthData(response);
          }
        })
      );
  }

  register(): Observable<any> {
    return this.http.post(this.url + '/auth/register', {
      email: this.email,
      password: this.password,
    });
  }

  resetPassword(): Observable<any> {
    return this.http.post(this.url + '/auth/reset-password', {
      email: this.email,
    });
  }

  private handleAuthData(response: any) {
    this.isAuthenticated$.next(true);
    this.token$.next(response.accessToken);
    this.userId$.next(response.userId);
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('userId', response.userId);
  }

  private authData(): any {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';
    if (!token) {
      return null;
    }

    return { token, userId };
  }

  autoSignIn() {
    const auth = this.authData();
    if (auth === null) {
      return;
    }

    this.isAuthenticated$.next(true);
    this.token$.next(auth.token);
    this.userId$.next(auth.userId);
  }

  async signOut() {
    await this.isAuthenticated$.next(false);
    await this.token$.next('');
    await this.userId$.next('');
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate(['/login']);
  }
}
