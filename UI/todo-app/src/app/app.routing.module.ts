import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from '../app/todo/todo.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'todo',
        component: TodoComponent,
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
