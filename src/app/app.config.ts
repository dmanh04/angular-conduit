import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
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
  handleErrorInterceptor,
} from './shared/interceptors';
import { provideComponentStore } from '@ngrx/component-store';
import { AuthStore } from './shared/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        apiPrefixInterceptor,
        apiAuthInterceptor,
        handleErrorInterceptor,
      ]),
    ),
    provideEnvironmentConfig(environment),
    provideComponentStore(AuthStore),
  ],
};
