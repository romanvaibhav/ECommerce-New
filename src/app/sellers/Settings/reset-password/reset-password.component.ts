import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaService } from '../../../authentication-service/Recaptcha/re-captcha.service';
import { ReCaptcha_Action } from '../../../constant/constant';
import { ConnectableObservable } from 'rxjs';
import { AuthenticationServiceService } from '../../../authentication-service/authentication-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  constructor(private activeRoute:ActivatedRoute, private _RecaptchaService:RecaptchaService, private authService:AuthenticationServiceService){

  }
  activeRouteToken:string | null='';
  ngOnInit(): void {
    this.activeRouteToken=this.activeRoute.snapshot.queryParamMap.get('token');
    console.log(this.activeRouteToken);
  }
  resetedPassword:string='';
  async handleResetPassword(){
    console.log(this.resetedPassword);

    this.authService.postResetPass(this.resetedPassword,this.activeRouteToken==undefined?"":this.activeRouteToken).subscribe({next:(value)=>{
      console.log("Succesfully Changed password",value)
    },
    error:(err)=>{
      console.log(err);
    }
  })

  }

}
