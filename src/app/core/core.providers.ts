import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './providers/auth.interceptor';

export const coreProviders = [
  provideHttpClient(withInterceptors([authInterceptor])),
];
