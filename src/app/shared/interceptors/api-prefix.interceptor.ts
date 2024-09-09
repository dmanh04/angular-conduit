import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { injectEnviromentConfig } from '../utils/di';

export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
    const env = injectEnviromentConfig();
    if(!req.url.includes('http')){
        const reqClone = req.clone({
            url: `${env.apiUrl}/${req.url}`
        })
        return next(reqClone);
    }
    return next(req);
};
