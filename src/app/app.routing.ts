/* https://jasonwatmore.com/post/2019/05/17/angular-7-tutorial-part-4-login-form-authentication-service-route-guard */
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';


const routes: Routes = [
    {  path : 'login', component: LoginComponent},
    {  path : 'register', component: RegisterComponent},
    { 
    
      path : '',
      canActivate: [AuthGuard],
      children:[

      { path : 'home', component: EmployeesComponent },
  ]
  
    },
  // otherwise redirect to home
{ path : "**", redirectTo: '/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingcomponents = [EmployeesComponent, LoginComponent,
    RegisterComponent

]
