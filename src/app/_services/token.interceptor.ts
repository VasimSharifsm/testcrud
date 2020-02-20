import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,
} from '@angular/common/http';
import { AuthenticationService } from '../_services';
import { Observable } from "rxjs";



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getAuthToken()}`
      }
    });

    return next.handle(request)
      ;
  }
}

