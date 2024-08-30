import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_CONFIG, provideEnvironmentCofig } from './shared/utils/di';
import { environment } from '../environments/environment';
import { apiPrefixInterceptor } from './shared/interceptors';

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
    provideEnvironmentCofig(environment)
  ]
};
