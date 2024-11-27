import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../../../authentication-service/authentication-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor( private authService:AuthenticationServiceService, httpClient:HttpClient){

  }

  ChangePass: FormGroup = new FormGroup({
    old_password: new FormControl("",[Validators.required, Validators.minLength(6)]),
    new_password: new FormControl("",[Validators.required, Validators.minLength(6)]),
  })

  errorMessage: string = '';

  handleChangePassword(){
    this.errorMessage = '';
    const User=this.ChangePass.value;
    console.log(User);
    this.authService.changePass({
      old_password:User.old_password,
      new_password:User.new_password
    }).subscribe({next:(value)=>{
      console.log(value);
      console.log("Password changed succesfully");
    },
    error: (err) => {
      console.log('Error while changing password \n' + err);
      console.log(err);
      if (err['error']) {
        this.errorMessage = err['error']['message'];
      }
    },})

  }



}
