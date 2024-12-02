import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router,){}
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
    localStorage.removeItem("token");
    this.router.navigateByUrl("/seller/login");
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

  // myusers(){
  //   this.router.navigate(['users'], { relativeTo: this.router.routerState.root });
  // }
}
