import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
  registerData = {
        Email: null,
        Password: null,
        ConfirmPassword:null,
        Roles:null
      };
    getAll() {
       // return this.http.get<any[]>(`${environment.API_URL}/users`);
       return this.http.get<User[]>(`/users`);
    }
    getAllRoles() {
      var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
      return this.http.get(environment.API_URL + '/api/GetAllRoles', { headers: reqHeader });
    }
    getById(id: number) {
        return this.http.get(`/users/` + id);
    }
    register(user : User)  {
        const uri = 'api/Account/Register';
            return this.getStringData(uri, user);
        //return this.http.post(`${environment.API_URL}/api/Account/Register`, user);
    }

    delete(id) {
        return this.http.delete(`${environment.API_URL}/users/${id}`);
    }
    getStringData(_relativeUrl, _data) {
        const headers = new HttpHeaders().set(
          'Content-Type',
          'application/json; charset=utf-8'
        );
       this.registerData.Email=_data.username;
       this.registerData.Password=_data.password;
       this.registerData.ConfirmPassword=_data.confirmpassword;
       this.registerData.Roles=_data.uroles;
       debugger;
       //this.registerData.Roles = _data.
        const _uri = 'http://localhost:57208/' + _relativeUrl;
        //const _uri = 'https://studentmanagementportalsit.azurewebsites.net/' + _relativeUrl;
        console.log(this.registerData);
        return this.http.post(_uri, this.registerData, { headers, responseType: 'text' })
        .pipe(map(response => response));
      }
}