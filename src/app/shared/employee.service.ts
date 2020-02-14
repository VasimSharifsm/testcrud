import { Injectable } from '@angular/core';
import { Employee, Country } from './employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  url = "http://localhost:57208/Api/Employee";

  constructor(private http : HttpClient) { }
  getalldata(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url + '/AllEmployeeDetails');
  }
  getCountry():Observable<Country[]>{
    return this.http.get<Country[]>(this.url + '/GetCountry');
  }
  InsertData(employee:Employee):Observable<Employee[]>{
    return this.http.post<Employee[]>(this.url + '/InsertEmployeeDetails/', employee);
  }
  GetIdData(employeeId:string):Observable<Employee>{
    return this.http.get<Employee>(this.url + '/GetEmployeeDetailsById/'+ employeeId);
  }
  UpdateEmployeeDetails(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.url+ '/UpdateEmployeeDetails/', employee);
  }
  DeleteEmployeeDetails(employeeId:string):Observable<Employee>{
    return this.http.delete<Employee>(this.url+'/DeleteEmployeeDetails?id='+ employeeId);
  }
}
