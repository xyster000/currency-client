import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthState } from "./auth.state";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  //private api = 'http://localhost:3000/auth';

  private api = 'currency-server-production.up.railway.app:3000/auth'

  constructor(private http: HttpClient, private state: AuthState) { }

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data).pipe(
      tap((tokens: { accessToken: string; refreshToken: string; }) => this.state.setTokens(tokens)),
    );
  }
  signup(data: { email: string; password: string }) {
    return this.http.post(`${this.api}/signup`, data);
  }
  refresh() {
    return this.http.post<any>(`${this.api}/refresh`, {
      refreshToken: this.state.refreshToken,
    });
  }

}
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
