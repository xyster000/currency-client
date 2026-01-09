import { Routes } from '@angular/router';
import { CurrencyComponent } from './components/currency-converter/currency-converter.component';
import { authGuard } from '../core/guards/auth.guard';
import { currencyGuard } from './guards/currency.guards';

export const currencyRoutes: Routes = [
  {
    path: '',
    component: CurrencyComponent,
    canActivate: [currencyGuard],
  },
];

