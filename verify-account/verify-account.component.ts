import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AuthenticationServiceService } from '../src/app/authentication-service/authentication-service.service';
import {Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit {


  activeRouteToken:string | null='';
  constructor(private router:Router,private activeRoute:ActivatedRoute, private authService: AuthenticationServiceService){}


  ngOnInit(): void {
    this.activeRouteToken=this.activeRoute.snapshot.queryParamMap.get('token');
    console.log(this.activeRouteToken);
    this.verifyAccount();
  }

  verifyAccount(){
    this.authService.postVerifyAccount(this.activeRouteToken??"").subscribe({next:(value)=>{
      console.log("Verified Succesfully Bro don't Worry")
      alert("Account Verified Succesfully");
      this.router.navigateByUrl("/auth/verify-email");
    },
  error: (err:any)=>{
    console.log("It think error is in the Verify Account",err);
  }})

  }
}
