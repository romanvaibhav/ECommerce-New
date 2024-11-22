import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {Router, RouterLink, RouterOutlet } from '@angular/router';
import { json } from 'stream/consumers';
import {Suser} from '../../../models/user.type';
import { LocalAuthService } from '../../services/local-auth/local-auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {AuthenticationServiceService} from "../../../authentication-service/authentication-service.service"
import { response } from 'express';
import { Token } from '@angular/compiler';
// import {regiUsers} from '../registration'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  http = inject(HttpClient)
  constructor(private localAuth: LocalAuthService, private router : Router,private authService:AuthenticationServiceService ) {}
  users:Suser[]=[];
  loginPage: any={
    email:'',
    password:''
  }

  login(){
    // console.log(this.users);
    // var localData:Suser[]=[];
    this.errorMessage = '';

    // let userInfo=localStorage.getItem("student")

    //Login Post request
    const user=this.loginPage;
    console.log(user);
    const loginObservable$ = this.authService.loginReq({
      email:user.email,
      password:user.password
    });
    loginObservable$.subscribe({next :(value:any)=>{
      console.log(value);
      console.log("Succesfull");
      if(value){
        console.log("Saving the value")
        localStorage.setItem("token",JSON.stringify(value["token"]));
        this.router.navigateByUrl("profile");
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
    // const log=JSON.parse(LogUser);
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
}
