import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthState {
  private _accessToken = signal<string | null>(
    localStorage.getItem('accessToken'),
  );

  private _refreshToken = signal<string | null>(
    localStorage.getItem('refreshToken'),
  );

  isAuthenticated = computed(() => !!this._accessToken());

  accessToken = computed(() => this._accessToken());

  setTokens(tokens: { accessToken: string; refreshToken: string }) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    this._accessToken.set(tokens.accessToken);
    this._refreshToken.set(tokens.refreshToken);
  }

  clear() {
    localStorage.clear();
    this._accessToken.set(null);
    this._refreshToken.set(null);
  }

  get refreshToken() {
    return this._refreshToken();
  }
}

