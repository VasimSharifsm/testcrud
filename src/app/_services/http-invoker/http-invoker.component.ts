import { Injectable,Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';
import {  HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-http-invoker',
  templateUrl: './http-invoker.component.html',
  styleUrls: ['./http-invoker.component.css']
})
export class HttpInvokerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  postData( _relativeUrl, _data) {   
    return this.http.post<any>(_relativeUrl, _data).pipe(map(response => {      
      return response;
    }));
  }
  getData( _relativeUrl, _params) {    
    const _uri =_relativeUrl;
    return this.http.get<any>(_uri, { params: _params }).pipe(map(res => {      
      return res;
    }));
  }
  getStringData( _data,API_URL) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    console.log(_data)
    return this.http.post(API_URL,_data, { headers, responseType: 'text' })
    .pipe(map(response => response));
  }
  getfileData( _data,API_URL) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data; '
    );
    console.log(_data)
    return this.http.post(API_URL,_data, { headers, responseType: 'text' })
    .pipe(map(response => response));
  }
  getStringData1( _data,API_URL) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    console.log(_data)
    return this.http.post(API_URL,_data, { headers, responseType: 'text' })
    .pipe(map(response => response));
  }
  }
