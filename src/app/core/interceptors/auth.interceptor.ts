import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the auth token from localStorage (or use a service)
    const authToken = localStorage.getItem('authToken');

    // Clone the request and add the Authorization header if token is available
    const authReq = authToken ? req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    }) : req;

    // Pass on the cloned request to the next handler
    return next.handle(authReq);
  }
}
