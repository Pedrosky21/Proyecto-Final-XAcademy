import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './AuthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only try to read token in browser
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = this.authService.getToken();
    }

    // If token exists, attach it to Authorization header
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq);
    }

    // If no token, send request without modification
    return next.handle(req);
  }
}
