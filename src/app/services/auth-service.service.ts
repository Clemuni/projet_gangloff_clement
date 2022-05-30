import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../ts/types';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public postLogin(login: string, password: string): Observable<any> {
    let data: string;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = `username=${login}&password=${password}`;
    return this.httpClient.post<any>('/api/login', data, httpOptions);
  }
}
