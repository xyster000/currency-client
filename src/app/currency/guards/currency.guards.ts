import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthState } from '../../auth/services/auth.state';

export const currencyGuard: CanActivateFn = () => {
  const state = inject(AuthState);
  const router = inject(Router);

  if (state.isAuthenticated() || localStorage.getItem('accessToken')) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
