import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: 'currency',
        loadChildren: () =>
            import('./currency/currency.routes')
                .then(m => m.currencyRoutes),
    }
];