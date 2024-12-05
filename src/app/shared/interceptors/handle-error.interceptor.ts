import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStore } from "../store";
import { catchError, throwError } from "rxjs";
import { ErrorResponse } from "../models";

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