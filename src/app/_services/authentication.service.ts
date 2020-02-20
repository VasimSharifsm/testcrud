import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpInvokerComponent } from './http-invoker/http-invoker.component';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private HttpInvoker: HttpInvokerComponent) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }
    LogInData = {
        UserName: null,
        Password: null
      };/*
    login(username, password) {
        return this.http.post<any>(`${environment.API_URL}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }*/
    login1(username: string, password: string) {
        return this.http.post<any>(`${environment.API_URL}/users/authenticate`, { username: username, password: password })
          .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
    
            return user;
          }));
      }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    getToken(_data) {
        const _uri = environment.API_URL + '/api/Account/Login';
        this.LogInData.UserName = _data.controls['username'].value;
        this.LogInData.Password = _data.controls['password'].value;
        return this.HttpInvoker.getStringData(this.LogInData, _uri);
      }
      getAuthToken() {
        return localStorage.getItem('token');
      }
    isAuth() {
        var isAuth = localStorage.getItem('token');
        if (isAuth != "") {    
          return true;
        }
        else {
          return false;
        }
        //return this.isAuthenticated;
      }
}