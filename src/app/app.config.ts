import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideEnvironmentConfig } from './shared/utils/di';
import { environment } from '../environments/environment';

import {
  apiAuthInterceptor,
  apiPrefixInterceptor,
} from './shared/interceptors';
import { provideComponentStore } from '@ngrx/component-store';
import { AuthStore } from './shared/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiPrefixInterceptor, apiAuthInterceptor])
    ),
    provideEnvironmentConfig(environment),
    provideComponentStore(AuthStore)
  ],
};
