import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideEnvironmentConfig } from './shared/utils/di';
import { environment } from '../environments/environment';
import { apiPrefixInterceptor } from './shared/interceptors/api-prefix.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        apiPrefixInterceptor
      ])
    ),
    provideEnvironmentConfig(environment)
  ]
};
