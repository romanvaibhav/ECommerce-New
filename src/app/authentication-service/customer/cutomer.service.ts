import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CutomerService {
  static baseUrl = environment.API_HOST_URL;

  constructor(private httpClient: HttpClient) { }

  //Getting the product List data from the API
  getCustProductList(Obj: any): Observable<object> {
    let params = new HttpParams();
    if (Obj.name) {
      params = params.set('name', Obj.name);
    }
    if (Obj.sortBy) {
      params = params.set('sortBy', Obj.sortBy);
    }
    if (Obj.limit) {
      params = params.set('limit', Obj.limit.toString());
    }
    if (Obj.page) {
      params = params.set('page', Obj.page.toString());
    }
    return this.httpClient.get(`${CutomerService.baseUrl}/shop/products`, { params });
  }


  //Posting the Registration PAge Data
  postCustRegistration(payload: {
    email: string,
    password: string,
    name: string,
    addresses: {
      street: string,
      addressLine2: string,
      city: string,
      state: string,
      pin: string
    }

  }): Observable<object> {
    return this.httpClient.post(`${CutomerService.baseUrl}/shop/auth/register?captcha=false`, payload);
  }

  //Customer Login
  postCustLogin(payload: {
    email: string,
    password: string
  }): Observable<object> {

    return this.httpClient.post(`${CutomerService.baseUrl}/shop/auth/login?captcha=false`, payload);
  }

  //Getting Customer Profile
  getCustProfile(): Observable<object> {

    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(`${CutomerService.baseUrl}/shop/auth/self`, { headers });
  }


  //Updating Customer Profile
  patchCustProfile(payload: {
    email: string,
    name: string
  }): Observable<object> {
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.patch(`${CutomerService.baseUrl}/customers/update-profile`, payload, { headers });
  }



  ////Updating Customer Image
  patchCustImage(
    cpicture: File
  ): Observable<object> {
    const formData = new FormData();
    formData.append('picture', cpicture, cpicture.name);
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`,);
    return this.httpClient.post(`${CutomerService.baseUrl}/customers/profile-picture`, formData, { headers });

  }


  //Deleting Customer Image
  deleteCustImage(): Observable<object> {
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.delete(`${CutomerService.baseUrl}/customers/profile-picture`, { headers })

  }


  //Getting Customer Addredd
  getCustAddress(): Observable<object> {
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(`${CutomerService.baseUrl}/customers/address`, { headers });

  }


  //Adding new Addredd
  postCustAdd(payload: {
    street: string,
    addressLine2: string,
    city: string,
    state: string,
    pin: string,
  }): Observable<object> {
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
      return this.httpClient.post(`${CutomerService.baseUrl}/customers/address`,payload,{headers});
  }

//Updating Customer Adddress
  putUpdateAdd(payload: {
    street: string,
    addressLine2: string,
    city: string,
    state: string,
    pin: string,
  },addId:string):Observable<object>{
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
      return this.httpClient.put(`${CutomerService.baseUrl}/customers/address/${addId}`,payload,{headers});

  }



  //Deleting Customer Adddress
  deleteAdd(addId:string):Observable<object>{
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
      return this.httpClient.delete(`${CutomerService.baseUrl}/customers/address/${addId}`,{headers});

  }


  //Change Customer Password
  postChangeCustPassword(payload:{
    old_password: string,
    new_password: string
  }):Observable<object>{
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
      return this.httpClient.post(`${CutomerService.baseUrl}/customers/auth/change-password`,payload,{headers});

  }



  //Deleting Customer account
  deleteCustomerAcc():Observable<object>{
    let logintoken = localStorage.getItem("custToken");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
      return this.httpClient.delete(`${CutomerService.baseUrl}/customers/account`,{headers});

  }
}



