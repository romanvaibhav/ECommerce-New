import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cauth',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './cauth.component.html',
  styleUrl: './cauth.component.css'
})
export class CauthComponent {

  constructor(private custAuth:CutomerService, private router:Router){}

  errorMessage: string = '';
  customerForm : FormGroup= new FormGroup({
    email: new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required, Validators.minLength(6)]),
    name:new FormControl("",[Validators.required]),
    street:new FormControl("",[Validators.required]),
    addressLine2: new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    pin:new FormControl("",[Validators.required])
    

  });
    onPressRegisterHandler() {
      this.errorMessage = '';
      // If Form not valid
      if (this.customerForm.invalid) {
        console.log("Form is invalid");
        return;
      }
      // Form Valid do below
      const User=this.customerForm.value;
      console.log(User);
      //Creating Post Request to send data to API
      this.custAuth.postCustRegistration({
        email: User.email,
        password:User.password,
        name: User.name,
        addresses:{
          street:User.street,
          addressLine2: User.addressLine2,
          city:User.city,
          state:User.state,
          pin:User.pin
        }
      }).subscribe({next: (value:any)=>{
        console.log(value);
        alert("Created CustomerRegistration succesfully");
      },
      error: (err:any) => {
        console.log('Error in Loging Button of Customer Registration\n' + err);
        console.log(err);
        if (err['error']) {
          this.errorMessage = err['error']['message'];
        }
      },
    })
      this.customerForm.reset();
    }


    clogin(){
      this.router.navigateByUrl("/auth/login");

    }
}
