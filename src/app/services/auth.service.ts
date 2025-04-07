import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, share, tap, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RefreshTokensRequest } from '../models/refresh-tokens-request';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';
import { LoadingService } from './loading.service';
import { TextboxService } from './textbox.service';
import { Router } from '@angular/router';

const AUTH_API_URL = "https://localhost:7156/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private loadingService: LoadingService = inject(LoadingService);
  private textBoxService: TextboxService = inject(TextboxService);
  private router: Router = inject(Router);

  private tokensRefreshing: boolean = false;
  private refreshObservable: Observable<LoginResponse> | null = null;

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
          this.openErrorBox(error);
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
          this.openErrorBox(error);
          return throwError(() => error);
        }),

        //Send to subscribers
        map((response: RegisterResponse) => {
          return response;
        })
      );
  }

  logout(): boolean {
    console.log('logged out!');

    // Clear access token from local storage
    localStorage.removeItem('accessToken');

    // Clear refresh token from cookies
    const cookieString = document.cookie;
    const cookieArr = cookieString.split('; ');
    for (const cookie of cookieArr) {
      const [name] = cookie.split('=');
      if (name === 'refreshToken') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }

    this.router.navigate(['/']);

    return true;
  }

  refreshToken(): Observable<LoginResponse> {

    // check if tokens are already refreshing, return same share observable if true
    if(this.tokensRefreshing && this.refreshObservable) {
      return this.refreshObservable;
    }
    this.tokensRefreshing = true;

    // get refreshToken from cookie
    const refreshToken = this.getRefreshTokenFromCookie();
    if(!refreshToken) { 
      return throwError(() => new Error('No refresh token found in cookies'));
    }

    // get userId from local storage
    const accessTokenPayload = localStorage.getItem('accessToken')?.split('.')[1];
    const decodedPayload = JSON.parse(atob(accessTokenPayload || ''));
    const userId = decodedPayload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    if(!userId) {
      return throwError(() => new Error('No user ID found in access token'));
    }

    const credentials: RefreshTokensRequest = {
      UserId: userId,
      RefreshToken: refreshToken
    };

    this.refreshObservable = this.httpClient.post<LoginResponse>(AUTH_API_URL + 'api/Auth/refresh-tokens', credentials)
      .pipe(
        tap((response: LoginResponse) => {
          if (response.accessToken) localStorage.setItem('accessToken', response.accessToken);
          if (response.refreshToken) document.cookie = `refreshToken=${response.refreshToken};`;
          console.log('tokens refreshed successfully!');
        }),
        finalize(() => {
          this.tokensRefreshing = false;
        }),
        share()
      );
  
    return this.refreshObservable;
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArr = cookieString.split('; ');
  
    for (const cookie of cookieArr) {
      const indexOfEqual = cookie.indexOf('=');
      const name = cookie.substring(0, indexOfEqual);
      const value = cookie.substring(indexOfEqual + 1);
  
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

  private openErrorBox(error: any): void {
    if(typeof(error.error) === 'string') {
      this.textBoxService.openWarningbox([error.error]);
    } else if(typeof(error.error) === 'object') {
      this.textBoxService.openWarningbox([error.message]);
    }
  }

}
