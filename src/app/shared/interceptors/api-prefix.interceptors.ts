import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { injectEnvironmentCofig } from '../utils/di';

export const apiPrefixInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
    const env = injectEnvironmentCofig();
    if(!req.url.includes('http')){
        const reqClone = req.clone({
            url: `${env.apiUrl}/${req.url}`
        })
        return next(reqClone);
    }
    return next(req);
};
