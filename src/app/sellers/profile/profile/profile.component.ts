import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../../authentication-service/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private route: ActivatedRoute,private router:Router, private authService:AuthenticationServiceService, httpClient:HttpClient){}

  selectedUserId: string='';
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  // ngAfterViewInit(){
  // // Show modal programmatically
  // }
  openmodel(){
    // this.selectedUserId=userId;
    const modal = new bootstrap.Modal(this.exampleModal.nativeElement, {
      backdrop: 'static', // Prevent closing on backdrop click
      keyboard: false // Prevent closing with keyboard (optional)
    });
    modal.show();
  }


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
      this.user=value;        
        },
  error:(err)=>{
    console.log(err);
  }});
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

    submit(){
      console.log(this.updateInfo.name);
      console.log(this.updateInfo.email);
    }
  
  // Updating Company Info
    updateCompanyInfo(){
      this.errorMessage = '';
      this.authService.updateCompanyData(this.updateInfo).subscribe({next:(response)=>{
        console.log("Data Updated succesfully",response);
        this.updateInfo={
          name:'',
          email:'',
        }
        this.reupdate();
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

    isEmailVerify=false;
    verifyEmail(){
      const profileObservable$=this.authService.postVerifyEmail();
      profileObservable$.subscribe({next :(value:any)=>{
        console.log("Email Sent Succesfully");
        console.log(value);
      },
    error:(err)=>{
      console.log(err);
    }})
    }




}
