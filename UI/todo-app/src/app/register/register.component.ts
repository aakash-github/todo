import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../core/user.model';
import { AuthenticationService } from '../core/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'todo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  titleAlert: string = 'This field is required';
  submitted = false;
  returnUrl: string;
  post: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, this.checkPassword]], 
      'confirm': [null, [Validators.required, this.checkPassword]]
      // , this.checkPasswordMatch
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'passwordPolicy': true } : null;
  }

  //TODO: Check confirm password.
  // checkPasswordMatch(control: FormGroup) {
  //   let pass = this.formGroup.get('email').value;
  //   let confirmPass = control.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('passwordPolicy') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  getErrorConfirmPassword() {
    return this.formGroup.get('confirm').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('confirm').hasError('passwordPolicy') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : 
      this.formGroup.get('confirm').hasError('notSame') ? 'Password and confirm password should be same' : '';
  } 

  onSubmit(post) {
    const user: User = new User();
    user.ConfirmPassword = this.formGroup.get('confirm').value;
    user.Password = this.formGroup.get('password').value;
    user.Email = this.formGroup.get('email').value;

    this.authService.register(user).subscribe(
      (resp) => {
        this.snackBar.open("Registration successful");
      }, 
      (error) =>{
        this.snackBar.open("Registration failed with error " + error);
      }
    )
  }

}
