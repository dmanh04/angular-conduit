import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorage, STORAGE_KEY } from '../constants';
import { AuthResponse } from '../models';

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
