import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from '../core/material-ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoRepoService } from '../todo/todo-repo.service';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../core/authentication.service';
import { HttpClient } from 'selenium-webdriver/http';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';

class MockMatSnackBar {
  open(message) {

  }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockMatSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialUiModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        AuthenticationService,
        { provide: HttpClient, deps: [MockBackend] },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
