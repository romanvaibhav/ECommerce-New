import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalAuthService} from '../sellers/services/local-auth/local-auth.service'
import {environment} from '../../environment/environment'
import { Suser } from '../models/user.type';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { strict } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private httpClient:HttpClient,  private localStorageService:LocalAuthService) { }
  static baseUrl=environment.API_HOST_URL;


  postRegistration(payload:{
    email:string;
    password:string;
    name:string;
    company:string;
  }): Observable<object> {
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl+'/auth/register?captcha=false',
      payload
    )
  }


  loginReq(payload:{
    email:string;
    password:string;
  }): Observable<object>{
    console.log(payload);
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl+'/auth/login?captcha=false',
      payload
    )
  }


  getUserProfile(){
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.get(AuthenticationServiceService.baseUrl+'/auth/self',{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)});

  }


  getAllUser(){
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.get(AuthenticationServiceService.baseUrl+'/users',{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)});
  }

  updateCompanyData(payload:{name:string, email:string}):Observable<object>{
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.patch(AuthenticationServiceService.baseUrl+'/users/org',payload,{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)});
  }


  getUserList(Obj:any):Observable<any>{
    let logintoken=localStorage.getItem("token");
    let params = new HttpParams();
    if(Obj.name){
      params=params.set('name', Obj.name);
    }
    if (Obj.role) {
      params = params.set('role', Obj.role);
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
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(AuthenticationServiceService.baseUrl+'/users',{params,headers});
  }

  //Creating User
  postCreateUser(payload:{
    email:string;
    password:string;
    name:string;
    role:string;
  }){
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl+'/users',payload,{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)}
    )
  }

  modifyCretedUserData(payload:{
    email: string;
    password: string;
    name: string;},userId:string): Observable<object>{
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/users/${userId}`,payload,{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)});
  }

  modifyCreatedUserRole(payload:{
    role:string
  },userId:string):Observable<object>{
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/users/role/${userId}`,payload,{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)})
  }


  deleteuser(userId:string):Observable<object>{
    let logintoken=localStorage.getItem("token");
    if(logintoken != null){
      logintoken=JSON.parse(logintoken);
    }
    return this.httpClient.delete(`${AuthenticationServiceService.baseUrl}/users/${userId}`,{headers:(new HttpHeaders()).set("Authorization",`Bearer ${logintoken}`)});
  }
}
