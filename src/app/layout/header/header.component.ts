import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  Logoutbtn(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

  myprofile(){
    this.router.navigateByUrl("/profile/myprofile");
  }  

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
