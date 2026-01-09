import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { coreProviders } from './app/core/core.providers';
import { authProviders } from './app/auth/auth.providers';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ...coreProviders,
    ...authProviders,
  ],
}).catch(err => console.error(err));