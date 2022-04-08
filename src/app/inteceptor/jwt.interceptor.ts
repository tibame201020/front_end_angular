import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ForwardMessageService } from '../forward-message.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private router: Router,
                private forwardMessageService:ForwardMessageService) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      if (err.status === 401 || err.status === 403) {
        this.forwardMessageService.setMessage('未有權限，將跳轉至首頁');
        this.forwardMessageService.setIcon('warning');
        this.forwardMessageService.setNextRoute('home');
        this.router.navigate(['forward']);
        return of(err.message);
      }
      return of(err);
  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.userValue;
        const isLoggedIn = user && user.access_token;

        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });
        }

        return next.handle(request).pipe(
          catchError(x=> this.handleAuthError(x))
        );
    }
}
