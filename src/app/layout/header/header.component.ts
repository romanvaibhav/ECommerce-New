import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ToasterService } from '../../shopper/services/toaster/toaster.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router,private toastService:ToasterService ){}
  isCurrentRouteCustomer?: boolean;
  ngOnInit(): void {
    this.router.events.subscribe(
      {
        next: (event:any) => {
          if (event instanceof NavigationEnd) {
            const url = event.url;
            if (url.startsWith("/seller")) {
              this.isCurrentRouteCustomer = true;
            }
            else {
              this.isCurrentRouteCustomer = false;
            }
          }
        }
      });
  }
  Logoutbtn(){
    localStorage.removeItem("haShown");
    localStorage.removeItem("token");
    this.router.navigateByUrl("/seller/login");
  }
  LogoutCbtn(){
    localStorage.removeItem("custToken");
    localStorage.removeItem("hasShown");
    this.router.navigateByUrl("/auth/login");
    this.toastService.showError('','Logged Out')
  }

  // myprofile(){
  //   this.router.navigateByUrl("/seller/profile/myprofile");
  // }  

  issideclose:boolean=false;
  closeDiv(){
    this.issideclose=false;

  }
  openProfile(){
    this.issideclose=true;
  }
  CustProfile(){
    const user=localStorage.getItem("custToken");
    if(user){
      this.router.navigateByUrl("auth/profile");
    }
    else{
      this.router.navigateByUrl("auth/login");

    }


  }


  // myusers(){
  //   this.router.navigate(['users'], { relativeTo: this.router.routerState.root });
  // }
}
