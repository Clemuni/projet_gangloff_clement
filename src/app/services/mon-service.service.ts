import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../ts/types';
import { environment } from './../../environments/environment';

@Injectable()
export class MonService {
  constructor(private httpClient: HttpClient) {}

  getCatalog(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.baseUrl);
  }
}
