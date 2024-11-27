import { AfterViewInit, Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink, RouterOutlet } from '@angular/router';
import { json } from 'stream/consumers';
import {environment} from "./../../../../environment/environment"
import {RecaptchaService} from "./../../../authentication-service/Recaptcha/re-captcha.service" 
import {Suser} from '../../../models/user.type';
import { LocalAuthService } from '../../services/local-auth/local-auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {AuthenticationServiceService} from "../../../authentication-service/authentication-service.service"
import { response } from 'express';
import { Token } from '@angular/compiler';
import { ReCaptcha_Action } from '../../../constant/constant';
// src/google.d.ts
declare var google: any;

// import {regiUsers} from '../registration'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: "893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  }

  googleLoginInfo={
    token:'',
    captcha:''
  }


  async handleCredentialResponse(response: any){
    console.log('Google Sign-In response:', response);
    // Get the Google ID token from the response
    const googleToken = response.credential;
    const captchatoken =await this._RecaptchaService.executeCaptcha(ReCaptcha_Action.Google_login)
    this.googleLoginInfo.token=googleToken;
    this.googleLoginInfo.captcha=captchatoken??"";
    // Send the Google token to your backend API
    this.authService.loginWithGoogle(this.googleLoginInfo).subscribe({next :(value:any)=>{
      console.log(value);
      console.log("Succesfull");
      if(value){
        console.log("Saving the value")
        localStorage.setItem("token",JSON.stringify(value["token"]));
        this.router.navigateByUrl("/profile/products");
      }
      else{
        console.log("Invalid User");
      }
    },
    error:(err:any)=>{
      console.log('Error in Loging Button \n' + err);
      console.log(err);
      if (err['error']) {
        this.errorMessage = err['error']['message'];
      }
    },
    complete: () => {
      console.log('complete login');
    }
  });
}

  errorMessage: string = '';
  http = inject(HttpClient)
  constructor(private renderer:Renderer2,private localAuth: LocalAuthService,private _RecaptchaService: RecaptchaService, private router : Router,private authService:AuthenticationServiceService ) {}
  users:Suser[]=[];

  loginPage : FormGroup= new FormGroup({
    email: new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required, Validators.minLength(6)]),
  });

  forgetEmail:string='';


  captchaToken?: string | undefined;
  async login(){
    this.errorMessage = '';
    //Login Post request
    const user=this.loginPage.value;
    console.log(user);
    const token =await this._RecaptchaService.executeCaptcha(ReCaptcha_Action.login);
    this.captchaToken=token;
    console.log(this.captchaToken);
    // console.log(token);
    const loginObservable$ = this.authService.loginReq({
      email:user.email,
      password:user.password,
      captcha:this.captchaToken,
    });
    loginObservable$.subscribe({next :(value:any)=>{
      console.log(value);
      console.log("Succesfull");
      if(value){
        console.log("Saving the value")
        localStorage.setItem("token",JSON.stringify(value["token"]));
        this.router.navigateByUrl("/profile/products");
      }
      else{
        console.log("Invalid User");
      }
    },
    error:(err)=>{
      console.log('Error in Loging Button \n' + err);
      console.log(err);
      if (err['error']) {
        this.errorMessage = err['error']['message'];
      }
    },
    complete: () => {
      console.log('complete login');
    }
  });
  const LogUser=localStorage.getItem("token");
  if(LogUser !=null && LogUser !=undefined){
    this.localAuth.setLoggedInUser(LogUser);
  }



  //Saving to Local Storage
    // if (this.loginPage == undefined || this.loginPage.invalid) {
    //   return;
    // }
    // if (localData !== null) {
    //   const user = this.localAuth.findUser(this.loginPage);
    //   // if(user){
      //   this.localAuth.setLoggedInUser(user)
      //   alert("User Login Succesfully");
      //   this.router.navigateByUrl("profile")
      // }
      // else{
      //   alert("Wrong Credentials");
      // }
    // } 
    // else {
    //   console.error("No student data found in localStorage");
    // }
  }
  // router= inject(Router);
  regi(){
    this.router.navigateByUrl("auth")
  }


  errForget:string=''
  isOpenForgtePass:boolean=false;
  ForgetEmail!:string;

  OpenForgetPass(){
    this.isOpenForgtePass=!this.isOpenForgtePass

  }
  async handleForgetPassword(){
    console.log('Email:', this.ForgetEmail);
    this.errForget='';
    const User=this.loginPage.value;
    const token= await this._RecaptchaService.executeCaptcha(ReCaptcha_Action.forget_pass);
    let ForgetToken=token;
    // console.log(token);
    console.log(ForgetToken);
    this.authService.postForgetPass({
      email:this.ForgetEmail,
      captcha:ForgetToken==undefined?"":ForgetToken
    }).subscribe({next:(value)=>{
      // console.log(value);
      console.log("Forget Password is Working in Process");
    },
    error: (err)=>{
      console.log('Error working on Forget Password password \n' + err);
      console.log(err);
      if (err['error']) {
        this.errorMessage = err['error']['message'];
      }
    }
  })


  }

}
// Have to solve this issue
// Have to solve the issue of showing the reCaptcha icon at the bottom
function ngAfterViewChecked() {
  throw new Error('Function not implemented.');
}


function handleForgetPassword() {
  throw new Error('Function not implemented.');
}

