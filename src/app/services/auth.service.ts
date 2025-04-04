import { inject, Injectable } from '@angular/core';
import { TextboxService } from './textbox.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RefreshTokensRequest } from '../models/refresh-tokens-request';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';
import { LoadingService } from './loading.service';

const AUTH_API_URL = "https://localhost:7156/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private loadingService: LoadingService = inject(LoadingService);
  private textBoxService: TextboxService = inject(TextboxService);

  constructor() { }

  login(credentials: LoginRequest): Observable<LoginResponse>{
    this.loadingService.openLoading();

    return this.httpClient.post<LoginResponse>(AUTH_API_URL + 'api/Auth/login', credentials)
      .pipe(

        //Executed regardless of subscription
        tap((response: LoginResponse) => {
          this.loadingService.closeLoading();
          if(response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if(response.refreshToken) {
            document.cookie = `refreshToken=${response.refreshToken};`;
          }
        }),
        catchError((error) => {
          this.loadingService.closeLoading();
          this.textBoxService.openWarningbox([error.error]);
          return throwError(() => error);
        }),

        //Send to subscribers
        map((response: LoginResponse) => {
          return response;
        })
      );
  }

  register(credentials: RegisterRequest): Observable<RegisterResponse> {
    this.loadingService.openLoading();

    return this.httpClient.post<RegisterResponse>(AUTH_API_URL + 'api/Auth/register', credentials)
      .pipe(

        //Executed regardless of subscription
        tap((response: RegisterResponse) => {
          this.loadingService.closeLoading();
          this.textBoxService.openTextbox(["Registration successful!"]);
        }),
        catchError((error) => {
          this.loadingService.closeLoading();
          this.textBoxService.openWarningbox([error.error]);
          return throwError(() => error);
        }),

        //Send to subscribers
        map((response: RegisterResponse) => {
          return response;
        })
      );
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

    return true;
  }

  refreshToken(credentials: RefreshTokensRequest): Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();
    if(!refreshToken) { 
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
