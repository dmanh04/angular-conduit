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

import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  apiAuthInterceptor,
  apiPrefixInterceptor,
} from './shared/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiPrefixInterceptor, apiAuthInterceptor])
    ),
    // provideStore({}),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (if trace is enabled)
      connectInZone: true // Ensures the connection is established within the Angular zone
    }),
    provideEnvironmentConfig(environment),
  ],
};
