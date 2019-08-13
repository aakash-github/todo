import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service'
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}