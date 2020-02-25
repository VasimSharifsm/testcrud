import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatButtonModule, MatMenuModule,MatSelectModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule,    MatInputModule, MatTooltipModule, MatToolbarModule, MatCheckboxModule   } from '@angular/material';  
import { MatRadioModule } from '@angular/material/radio';  
import {AppRoutingModule, routingcomponents} from './app.routing';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';  
// used to create fake backend
import { fakeBackendProvider, JwtInterceptor, ErrorInterceptor, AuthGuard } from './_helpers';
import { TokenInterceptor } from './_services/token.interceptor';
import { UserService, AuthenticationService } from './_services';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    LoginComponent,
    RegisterComponent,
    routingcomponents,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule, HttpClientModule,FormsModule, ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,  
    MatButtonModule,  
    MatCheckboxModule,
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,   
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },  
    fakeBackendProvider
  ],// provider used to create fake backend],
  bootstrap: [AppComponent, 
    
]
})
export class AppModule { }
