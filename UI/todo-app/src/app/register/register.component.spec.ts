import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule, FormControl, ValidationErrors } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from '../core/material-ui.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../core/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

class MockMatSnackBar {
  open(message) {

  }
}

class MockAuthenticationService{
  register(){
    return Observable.of("Registration successful");
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockMatSnackBar: MatSnackBar;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockAuthenticationService : AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialUiModule,
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatSnackBar, useClass: MockMatSnackBar },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: FormBuilder, useValue: formBuilder }
        // { provide: HttpClient, deps: [MockBackend] },
        // {
        //   provide: Router,
        //   useClass: class { navigate = jasmine.createSpy("navigate"); }}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    mockAuthenticationService = TestBed.get(AuthenticationService);
    mockMatSnackBar = TestBed.get(MatSnackBar);
    component = fixture.componentInstance;
    component.formGroup = formBuilder.group({
            email: ['email', Validators.required],
            password: ['password',Validators.required],
            confirm: ['confirm', Validators.required]
    });
    fixture.detectChanges();
  });

  it('should create RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formGroup.get('email').value === null);
    expect(component.formGroup.get('password').value === null);
    expect(component.formGroup.get('confirm').value === null);
  });

  it('checkPassword should return null if password policy met', () => {
    let control = new FormControl();
    control.setValue("Password@1234");
    let res = component.checkPassword(control);
    expect(res).toBeNull();
  });
  
  it('checkPassword should set passwordPolicy error password policy NOT met', () => {
    let control = new FormControl();
    control.setValue("password@1");
    let res = component.checkPassword(control);
    expect(res.passwordPolicy).toBe(true);
  });

  it('getErrorEmail should return  "Field is required" for required error', () => {
    component.formGroup.get("email").setErrors({"required": true});
    let res = component.getErrorEmail();
    expect(res).toBe("Field is required");
  });

  it('getErrorEmail should return  "Not a valid email address" for pattern error', () => {
    component.formGroup.get("email").setErrors({"pattern": true});
    let res = component.getErrorEmail();
    expect(res).toBe("Not a valid email address");
  });

  it('getErrorPassword should return  "Field is required (at least eight characters, one uppercase letter and one number)" for required error', () => {
    component.formGroup.get("password").setErrors({"required": true});
    let res = component.getErrorPassword();
    expect(res).toBe("Field is required (at least eight characters, one uppercase letter and one number)");
  });

  it('getErrorPassword should return  "Password needs to be at least eight characters, one uppercase letter and one number" for passwordPolicy error', () => {
    component.formGroup.get("password").setErrors({"passwordPolicy": true});
    let res = component.getErrorPassword();
    expect(res).toBe("Password needs to be at least eight characters, one uppercase letter and one number");
  });

  it('getErrorConfirmPassword should return  "Field is required (at least eight characters, one uppercase letter and one number)" for required error', () => {
    component.formGroup.get("confirm").setErrors({"required": true});
    let res = component.getErrorConfirmPassword();
    expect(res).toBe("Field is required (at least eight characters, one uppercase letter and one number)");
  });

  it('getErrorConfirmPassword should return  "Password needs to be at least eight characters, one uppercase letter and one number" for passwordPolicy error', () => {
    component.formGroup.get("confirm").setErrors({"passwordPolicy": true});
    let res = component.getErrorConfirmPassword();
    expect(res).toBe("Password needs to be at least eight characters, one uppercase letter and one number");
  });

  it('getErrorConfirmPassword should return  "Password and confirm password should be same" for different password', () => {
    component.formGroup.get("confirm").setErrors({"notSame": true});
    let res = component.getErrorConfirmPassword();
    expect(res).toBe("Password and confirm password should be same");
  });

  it('should call register of auth service on Submit', () => {
    spyOn(mockAuthenticationService, 'register').and.callThrough();
    spyOn(mockMatSnackBar, 'open').and.callThrough();
    let res = component.onSubmit({});
    
    expect(mockAuthenticationService.register).toHaveBeenCalled();
    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Registration successful");
  });
});
