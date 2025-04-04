import { inject, Injectable } from '@angular/core';
import { TextboxService } from './textbox.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RefreshTokensRequest } from '../models/refresh-tokens-request';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';

const AUTH_API_URL = "https://localhost:7156/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private textboxService: TextboxService = inject(TextboxService);
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(AUTH_API_URL + 'api/Auth/login', credentials)
      .pipe(
        map((response: LoginResponse) => {
          if(response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if(response.refreshToken) {
            document.cookie = `refreshToken=${response.refreshToken};`;
          }
          return response;
        })
      );
  }

  register(credentials: RegisterRequest): boolean {
    this.httpClient.post<RegisterResponse>(AUTH_API_URL + 'api/Auth/register', credentials)
      .subscribe({
        next: (response) => {
          this.textboxService.openTextbox(['Registration', 'You have been registered successfully.']);
        },
        error: (error) => {
          this.textboxService.openWarningbox([error.error]);
        }
      });
    return true;
  }

  logout(): boolean {
    localStorage.removeItem('accessToken');

    const cookieString = document.cookie;
    const cookieArr = cookieString.split('; ');
    for (const cookie of cookieArr) {
      const [name] = cookie.split('=');
      if (name === 'refreshToken') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    this.textboxService.openTextbox(['Logout', 'You have been logged out successfully']);
    return true;
  }

  refreshToken(credentials: RefreshTokensRequest): Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();
    if(!refreshToken) { 
      this.textboxService.openWarningbox(['No refresh token found in cookies. Please log in again.']);
      this.logout();
      return new Observable<LoginResponse>();
    }

    credentials.refreshToken = refreshToken;
    return this.httpClient.post<LoginResponse>(AUTH_API_URL + 'api/Auth/refresh-tokens', { refreshToken })
      .pipe(
        map((response: LoginResponse) => {
          if(response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if(response.refreshToken) {
            document.cookie = `refreshToken=${response.refreshToken};`;
          }
          return response;
        })
      );
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArr = cookieString.split('; ');

    for (const cookie of cookieArr) {
      const [name, value] = cookie.split('=');
      if (name === 'refreshToken') {
        return value;
      }
    }

    return null;
  }

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null && accessToken !== undefined;
  }

  
}
