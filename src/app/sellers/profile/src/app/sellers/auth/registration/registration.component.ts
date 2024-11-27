// import { Component } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { LocalAuthService } from '../../services/local-auth/local-auth.service';
// import { Suser } from '../../../models/user.type';
import {AuthenticationServiceService} from '../../../authentication-service/authentication-service.service'


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  constructor(private localAuth: LocalAuthService, private authService:AuthenticationServiceService, private router:Router) {}
  errorMessage: string = '';
  studentForm : FormGroup= new FormGroup({
    email: new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required, Validators.minLength(6)]),
    fullName: new FormControl("",[Validators.required]),
    companyName: new FormControl("",[Validators.required])
  });

    onPressRegisterHandler() {
      this.errorMessage = '';

      // If Form not valid
      if (this.studentForm.invalid) {
        console.log("Form is invalid");
        return;
      }

      // Form Valid do below
      const User=this.studentForm.value;
      //Creating Post Request to send data to API
      this.authService.postRegistration({
        company: User.companyName,
        email: User.email,
        name: User.fullName,
        password: User.password,
      }).subscribe({next: (value)=>{
        console.log(value);
        console.log("Inside Next");
        alert("Created succesfully");
      },
      error: (err) => {
        console.log('Error in Loging Button \n' + err);
        console.log(err);
        if (err['error']) {
          this.errorMessage = err['error']['message'];
        }
      },
    })
      // this.localAuth.addUser(User);      
      this.studentForm.reset();
    }
  
}
