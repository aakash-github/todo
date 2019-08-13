import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { User } from './user.model';
import { Observable } from 'rxjs';
import { _throw as throwError } from 'rxjs/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }
    baseUrl = environment.apiUrl;

    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');

        return this.http.post<any>(
            `${this.baseUrl}Token`,
            body.toString(),
            { headers: headers })
            .pipe(map(user => {
                if (user && user.access_token) {
                    localStorage.setItem('accessToken', JSON.stringify(user.access_token));
                }
                return user;
            })).catch((err) => {
                return throwError(err);
            });
    }

    logout() {
        // remove token from local storage to log user out
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
    }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}api/Account/Register`, { Email: user.Email, Password: user.Password, ConfirmPassword: user.ConfirmPassword })
            .pipe(map(isRegistered => {
                this.router.navigate(['/login']);
            })).catch((err) => {
                return throwError(err);
            });;
    }
}