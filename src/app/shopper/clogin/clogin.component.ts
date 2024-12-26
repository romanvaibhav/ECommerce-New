import { Component } from '@angular/core';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Slider } from 'primeng/slider';

@Component({
  selector: 'app-clogin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ButtonModule],
  templateUrl: './clogin.component.html',
  styleUrl: './clogin.component.css'
})
export class CloginComponent {


  constructor(private custAuth:CutomerService, private router:Router){}


  custLoginPage : FormGroup= new FormGroup({
    email: new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required, Validators.minLength(6)]),
  });

  clogin(){
    const Cuser=this.custLoginPage.value;

    this.custAuth.postCustLogin({
      email:Cuser.email,
      password:Cuser.password
    }).subscribe({next:(value:any)=>{
      console.log("Login Succesfully",value);
      localStorage.setItem("custToken",JSON.stringify(value["token"]));
      this.router.navigateByUrl("/");

    },
    error:(err)=>{
      console.log(err);
    }
  })
  }
  cregi(){
    
    this.router.navigateByUrl("/auth/registration");


  }
}
