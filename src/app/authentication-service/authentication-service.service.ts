import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalAuthService } from '../sellers/services/local-auth/local-auth.service'
import { environment } from '../../environment/environment'
import { Suser } from '../models/user.type';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Token } from '@angular/compiler';
import { strict } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private reCaptchaV3Service: ReCaptchaV3Service, private httpClient: HttpClient, private localStorageService: LocalAuthService) { }
  static baseUrl = environment.API_HOST_URL;


  postRegistration(payload: {
    email: string;
    password: string;
    name: string;
    company: string;
  }): Observable<object> {
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl + '/auth/register?captcha=false',
      payload
    )
  }

  loginReq(payload: {
    email: string;
    password: string;
    captcha: string | undefined;
  }): Observable<object> {
    console.log(payload);
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl + '/auth/login',
      payload
    )
  }


  getUserProfile() {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.get(AuthenticationServiceService.baseUrl + '/auth/self', { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) });

  }


  getAllUser() {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.get(AuthenticationServiceService.baseUrl + '/users', { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) });
  }

  updateCompanyData(payload: { name: string, email: string }): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.patch(AuthenticationServiceService.baseUrl + '/users/org', payload, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) });
  }


  getUserList(Obj: any): Observable<any> {
    let logintoken = localStorage.getItem("token");
    let params = new HttpParams();
    if (Obj.name) {
      params = params.set('name', Obj.name);
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
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(AuthenticationServiceService.baseUrl + '/users', { params, headers });
  }

  //Creating User
  postCreateUser(payload: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.post(
      AuthenticationServiceService.baseUrl + '/users', payload, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) }
    )
  }

  modifyCretedUserData(payload: {
    email: string;
    password: string;
    name: string;
  }, userId: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/users/${userId}`, payload, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) });
  }

  modifyCreatedUserRole(payload: {
    role: string
  }, userId: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/users/role/${userId}`, payload, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) })
  }


  deleteuser(userId: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.delete(`${AuthenticationServiceService.baseUrl}/users/${userId}`, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) });
  }




  //Setting  Requests On Login Page Advance Auth Functionalities

  changePass(payload: {
    old_password: string,
    new_password: string
  }): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/users/auth/change-password`, payload, { headers: (new HttpHeaders()).set("Authorization", `Bearer ${logintoken}`) })
  }

  postForgetPass(payload: {
    email: string,
    captcha: string
  }): Observable<object> {
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/auth/forgot-password`, payload);
  }

  postResetPass(password: string, token: string): Observable<object> {
    // let params = new HttpParams().set('token', token);
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/auth/reset-password`, { password }, { params: { token } })
  }

  postVerifyEmail() {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    console.log("Here is the login token")
    console.log(logintoken);
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/auth/send-verification-email`,
      {}, { headers: { "Authorization": `Bearer ${logintoken}` } })
  }

  postVerifyAccount(token: string) {
    // let params=new HttpHeaders().set('token',token);
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/auth/verify-email`, {}, { params: { token } })
  }

  loginWithGoogle(payload: {
    token: string,
    captcha: string
  }) {
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/auth/login/google`, payload);

  }




  //Work on Products
  //Fetching Product Data and appliying filering 
  getProductList(Obj: any): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
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
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(`${AuthenticationServiceService.baseUrl}/products`, { params, headers });
  }

  //Getting One Product
  getOneProduct(productId: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.get(`${AuthenticationServiceService.baseUrl}/products/${productId}`, { headers });
  }

  //Creating Products
  postCreateProduct(
    name: string,
    images: File[],
    price: number,
    description: string,
  ): Observable<object> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    images.forEach(image => {
      formData.append('images', image, image.name);
    });
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.post(`${AuthenticationServiceService.baseUrl}/products`, formData, { headers });
  }

  //Updating Product Data
  patchUpdateProduct(payload: {
    name: string,
    description: string,
    price: number
  }, productId: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/products/${productId}`, payload, { headers })
  }


  //upldating Product Images  -----------> Its Not Working
  patchUpdateProductImage(payload: {
    new_images: File[],
    delete: string[]
  }, public_id: string): Observable<object> {
    const formData = new FormData();
    payload.new_images.forEach(image => {
      formData.append('image', image.name);
    });
    payload.delete.forEach(del => {
      formData.append('delete', del);
    });
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.patch(`${AuthenticationServiceService.baseUrl}/products/images/${public_id}`, formData, { headers });
  }


  //Deleting Product
  deleteProduct(public_id: string): Observable<object> {
    let logintoken = localStorage.getItem("token");
    if (logintoken != null) {
      logintoken = JSON.parse(logintoken);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${logintoken}`);
    return this.httpClient.delete(`${AuthenticationServiceService.baseUrl}/products/${public_id}`, { headers });
  }






}
