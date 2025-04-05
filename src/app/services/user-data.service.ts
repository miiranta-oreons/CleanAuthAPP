import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API_URL = "https://localhost:7156/";

interface UserDataResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private httpClient: HttpClient = inject(HttpClient);

  //authenticated-only
  fetchUserData(): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>(AUTH_API_URL + 'api/Auth/authenticated-only');
  }

  //admin-only
  fetchUserAdmin(): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>(AUTH_API_URL + 'api/Auth/admin-only');
  }

}
