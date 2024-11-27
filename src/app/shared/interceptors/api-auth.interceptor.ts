import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorage, STORAGE_KEY } from '../constants';
import { AuthResponse, ErrorResponse } from '../models';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthStore } from '../store';

export const apiAuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const localStorage = inject(LocalStorage);
  const authResponse = localStorage.getItem<AuthResponse>(STORAGE_KEY.token);
  if (
    req.url.includes('/api/v1') &&
    !req.headers.has('Authorization') &&
    authResponse
  ) {
    const reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authResponse.token}`,
      },
    });
    return next(reqClone);
  }
  return next(req);
};

export const handleErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authStore = inject(AuthStore);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const err = error.error as ErrorResponse;
      if(err.code === 401 || err.code === 403){
        authStore.logout();
      }
      return throwError(() => error);
    })
  )

};
