import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CutomerService {
  static baseUrl=environment.API_HOST_URL;

  constructor(private httpClient:HttpClient) { }

  getCustProductList():Observable<object>{
    return this.httpClient.get(`${}}`);
  }

}
