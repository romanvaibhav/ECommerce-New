import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../../authentication-service/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private route: ActivatedRoute,private router:Router, private authService:AuthenticationServiceService, httpClient:HttpClient){}

  user: any | undefined;
  errorMessage: string = '';
  updateInfo: any={
    name:'',
    email:'',
  }






  ngOnInit():void{
    const profileObservable$=this.authService.getUserProfile();
    profileObservable$.subscribe({next :(value:any)=>{
      console.log("Here is value")
      console.log(value);
      console.log("All user is calling")
      // this.getAllUsers();
      this.user=value;        
      // console.log(this.user);
      // console.log(this.Duser);
        },
  error:(err)=>{
    console.log(err);
  }});
  //Calling listUser
  // this.listUser();
  }


  reupdate(){
    const profileObservable$=this.authService.getUserProfile();
    profileObservable$.subscribe({next :(value:any)=>{
      console.log(value);
      this.user=value;
    },
  error:(err)=>{
    console.log(err);
  }})
  }

  logOut(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

    // Submiting the updated value
    submit(){
      console.log(this.updateInfo.name);
      console.log(this.updateInfo.email);
    }
  
  
  // Updating Company Info
    updateCompanyInfo(){
      this.errorMessage = '';
      this.authService.updateCompanyData(this.updateInfo).subscribe({next:(response)=>{
        console.log("Data Updated succesfully",response);
        this.reupdate();
        // this.item=response;
      },
      error: (err) => {
        console.log('Error in Loging Button \n' + err);
        console.log(err);
        if (err['error']) {
          this.errorMessage = err['error']['message'];
        }
      }
    });
    }

}
