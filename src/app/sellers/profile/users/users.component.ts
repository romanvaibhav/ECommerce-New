import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../../authentication-service/authentication-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tuser } from '../../../models/user.type';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  Duser: Tuser[] = [];
  // item:any |undefined;
  errorMessage: string = '';



  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationServiceService, httpClient: HttpClient) {

  }
  opmode: boolean = false;

  currentPage:number=0;
  userList: any = {
    name: '',
    role: '',
    sortBy: '',
    limit: 0,
    page: 1,
  }

  addUser: any = {
    name: '',
    email: '',
    password: '',
    role: '',
  }
  updateInfo: any = {
    name: '',
    email: '',
  }
  updateUser: any = {
    email: '',
    password: '',
    name: ''
  }
  updateRole: any = {
    role: '',
  }


  ngOnInit(): void {
    const profileObservable$ = this.authService.getUserProfile();
    profileObservable$.subscribe({
      next: (value: any) => {
        console.log("Here is value")
        console.log(value);
        console.log("All user is calling")
        this.getAllUsers();
        // console.log(this.user);
        // console.log(this.Duser);
      },
      error: (err) => {
        console.log(err);
      }
    });
    //Calling listUser
    // this.listUser();
  }



  //Fetching List of users
  onChange(event:any){
    this.listUser();
    
  }
  listUser(){
    const observeUser$=this.authService.getUserList(this.userList);
    observeUser$.subscribe({next: (value)=>{
      console.log("users LIST fetched Succesfully");
      console.log(value);
      this.Duser = value["results"] as [];

      // this.currentPage=value;
      this.SortByPage();

      // this.currentPage=value.totalPages;
    },
    error:(err)=>{
      console.log(err);
    }
  })
  }


  //Creating User

  createUser() {
    let User = this.addUser
    console.log(User);
    this.authService.postCreateUser({
      email: User?.email,
      password: User?.password,
      name: User?.name,
      role: User?.role,
    }).subscribe({
      next: (value) => {
        console.log("Created Succesfully");
        this.getAllUsers();
      },
      error: (err) => {
        console.log('Error in Loging Button \n' + err);
        console.log(err);
        if (err['error']) {
          this.errorMessage = err['error']['message'];
        }
      },
    })
  }



  getAllUsers() {
    this.authService.getAllUser().subscribe({
      next: (value: any) => {
        console.log("Here is All user i found it")
        console.log(value);
        console.log("Saving Duser");
        this.Duser = value["results"] as [];
        // console.log(this.Duser);
        this.currentPage=value.totalPages;
        console.log(this.currentPage);
        this.SortByPage()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  modifyUserInfo(userId: string) {
    console.log(userId);
  }

  modifyUser(userId: string) {
    console.log(userId);
    console.log(this.updateUser.name);
    console.log(this.updateUser.email);
    this.authService.modifyCretedUserData(this.updateUser, userId).subscribe({
      next: (value) => {
        console.log("Succesfully updated user Info");
        console.log(value);
        this.getAllUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  //Modifying User Role
  selectedValue: any = {
    role: ''
  }
  options = [
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' }];
  modifyUserRole(userId: string) {
    console.log(this.selectedValue.role);
    this.authService.modifyCreatedUserRole(this.selectedValue, userId).subscribe({
      next: (value) => {
        console.log("Updated the user Role");
        this.getAllUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Deleting User
  deleteUser(userId: string) {
    this.authService.deleteuser(userId).subscribe({
      next: (value) => {
        console.log("Deleted Succesfully");
        this.getAllUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // Sorting 
  SortByList = [
    { value: '', label: '' },
    { value: 'name', label: 'name' },
    { value: 'sortBy', label: 'sortBy' },
    { value: 'role', label: 'role' }];

  SortByRole= [
    { value: '', label: '' },
    { value: 'admin', label: 'admin' },
    { value: 'user', label: 'user' }];

  SortBylimit: number[]=[1,2,3,4,5,10,15,10,25,30];
  TotalPage:number[]=[];
  SortByPage(){
    this.TotalPage=Array.from({ length:this.currentPage}, (_, i) => i+1);
    console.log(this.TotalPage);
  }

  clearAll(){
    this.userList={
      name: '',
      role: '',
      sortBy: '',
      limit: 0,
      page: 1,
    }
    this.listUser();

  }



}
