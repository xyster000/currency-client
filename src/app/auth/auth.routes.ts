import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { authGuard } from '../core/guards/auth.guard';
export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [authGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [authGuard],
      },
    ],
  },
];