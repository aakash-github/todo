import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoRepoService } from './todo/todo-repo.service';
import { TodoComponent } from './todo/todo.component';
import { TodoListHeaderComponent } from './todo/todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoListItemComponent } from './todo/todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todo/todo-list-footer/todo-list-footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MaterialUiModule } from './core/material-ui.module'
import { AuthenticationService } from './core/authentication.service';
import { AuthGuard } from './core/auth-guard.service';
import { ErrorInterceptor } from './core/http-error.interceptor';
import { TokenInterceptor } from './core/http-token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    TodoListHeaderComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoListFooterComponent,
    TodoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialUiModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [
    TodoRepoService,
    AuthGuard,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
