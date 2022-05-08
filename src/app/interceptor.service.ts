import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor,
  HttpRequest 
} from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    })

    return next.handle(req);
  }
}
