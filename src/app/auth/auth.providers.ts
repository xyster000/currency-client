import { Provider } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthState } from './services/auth.state';

export const authProviders: Provider[] = [
  AuthService,
  AuthState,
];
