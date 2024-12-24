import { Component } from '@angular/core';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { custAdd } from '../../models/user.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {


  constructor(private custAuth:CutomerService){}


  ngOnInit():void{
    this.customerAddredd()
  }
  isDisplayAdd:boolean=true;
  isUpdateAdd:boolean=false;
  isAddAddress:boolean=false;
  isChangePass:boolean=false;
  isDeleteAccount:boolean=false;


  cupdateAdd={
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: ''
  }
  updateAddress(addId:string){
    this.custAuth.putUpdateAdd(this.cupdateAdd,addId).subscribe({next:(value)=>{
      console.log("Succesfully Updated the Address",value);
      this.customerAddredd()
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }


  cAdd:custAdd[]=[];
  customerAddredd() {
    this.custAuth.getCustAddress().subscribe({
      next: (value) => {
        console.log("Succesfully Got Cust Addredd", value);
        this.cAdd=value as [];
        console.log(this.cAdd);
            },
      error: (err) => {
        console.log(err);
      }
    })

  }


  deleteAddress(addId:string){
    this.custAuth.deleteAdd(addId).subscribe({next:(value)=>{
      console.log("Succesfully Deleted Customer Addredd",value);
      this.customerAddredd()
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }


  cnewAdd={
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: ''
  }
  addNewAddress(){
    this.custAuth.postCustAdd(this.cnewAdd).subscribe({next:(value)=>{
      console.log("Succesfully Posted New Addredd",value);
      this.customerAddredd()
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }



 //Change Password of Customer
 cpasswords={
  old_password: '',
  new_password: ''
    }
chnageCustPassword(){
  this.custAuth.postChangeCustPassword(this.cpasswords).subscribe({next:(value)=>{
    console.log("Succesfully Changed Customer Password",value);
    this.customerAddredd()
  },
  error:(err)=>{
    console.log(err);
  }
})
}


//Deleting Customer Account
DeleteCustAccount(){
  this.custAuth.deleteCustomerAcc().subscribe({next:(value)=>{
    console.log("Succesfully Deleted Customer Account",value);
    this.customerAddredd()
  },
  error:(err)=>{
    console.log(err);
  }
})
}


AddAddress(){
  this.isAddAddress=true;
  this.isDisplayAdd=false;
  this.isChangePass=false;
  this.isDeleteAccount=false;
}
ChangePass(){
  this.isAddAddress=false;
  this.isDisplayAdd=false;
  this.isChangePass=true;
  this.isDeleteAccount=false;
}

UpdateAddress(){
  this.isAddAddress=false;
  this.isDisplayAdd=true;
  this.isChangePass=false;
  this.isDeleteAccount=false;
}
DeleteingAccount(){
  this.isAddAddress=false;
  this.isDisplayAdd=false;
  this.isChangePass=false;
  this.isDeleteAccount=true;

}

}
