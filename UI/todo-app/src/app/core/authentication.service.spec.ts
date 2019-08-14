import {TestBed, async, inject} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.prod';
import { User } from './user.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService], 
      imports: [RouterTestingModule]
    });
  });

  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    //Make sure no request pending
    httpMock.verify();
  });

  it('should return access_token on login', () => {
    let token = '#@@32324q2432';
    service.login("someuser@gmail.com", "Password@1234").subscribe(token => {
      expect(token).toBe(token);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}Token`);
    expect(req.request.method).toBe("POST");
    req.flush(token);
  });

  it('accessToeken should be removed on logout', () => {
    localStorage.setItem('accessToken', JSON.stringify("32252@323"));
    service.logout();
    expect(localStorage.getItem('accessToken')).toBeFalsy();
  });

  it('should register user', () => {
    let user = new User();
    service.register(user).subscribe(response => {
      expect(response).toBe(undefined);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}api/Account/Register`);
    expect(req.request.method).toBe("POST");
  });
});