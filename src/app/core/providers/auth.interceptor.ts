import {
    HttpErrorResponse,
    HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthState } from './../../auth/services/auth.state';
import { AuthService, AuthTokens } from './../../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const state = inject(AuthState);
    const auth = inject(AuthService);

    const token = state.accessToken();

    const authReq = token
        ? req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        })
        : req;

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && state.refreshToken) {
                return auth.refresh().pipe(
                    switchMap((tokens: AuthTokens) => {
                        state.setTokens(tokens);

                        return next(
                            req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${tokens.accessToken}`,
                                },
                            }),
                        );
                    }),
                );
            }

            return throwError(() => err);
        }),
    );
};
