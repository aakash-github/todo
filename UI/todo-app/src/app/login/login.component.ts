import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../core/authentication.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      private snackBar: MatSnackBar) {}

  ngOnInit() {
      this.createForm();
      // this.authService.logout();
  }

  createForm() {
    
      let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
      this.formGroup = this.formBuilder.group({
        'email': [null, [Validators.required, Validators.pattern(emailregex)]],
        'password': [null, [Validators.required, this.checkPassword]],
      });
    }
  
    checkPassword(control) {
      let enteredPassword = control.value
      let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'passwordPolicy': true } : null;
    }
  
    getErrorEmail() {
      return this.formGroup.get('email').hasError('required') ? 'Field is required' :
        this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' : '';
    }
  
    getErrorPassword() {
      return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
        this.formGroup.get('password').hasError('passwordPolicy') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
    }

    onSubmit(post) {
      this.authService.login(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(
        (resp) => {
          this.snackBar.open("Logged in successful");
          this.router.navigate(['/todo']);
        }, 
        (error) =>{
          this.snackBar.open("ERROR loggin in " + 'error');
        }
      )
    }
}
