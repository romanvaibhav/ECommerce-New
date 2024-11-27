import { Injectable } from '@angular/core';
import { Suser } from '../../../models/user.type';
import { student, currentUser } from '../../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {

  constructor() { }

  addUser(user:Suser){
    let users=this.getAllUsers();
    localStorage.setItem(student,JSON.stringify([...users,user]));
  }
  getAllUsers(): Suser[]{
    try {
      const users = localStorage.getItem(student);
      if (users === null) {
        return [];
      }
      return JSON.parse(users) as Suser[];
    } catch (err) {
      console.log('Error while fetching local Storage');
    }
    return [];
  }
  setLoggedInUser(user : string | null)  : void {
    localStorage.setItem("token",JSON.stringify(user));
  }

  findUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Suser | null {
    try {
      const users = this.getAllUsers();
      const user = users.find(
        (value) => value.email === email && value.password == password
      );
      if (user) {
        return user;
      }
    } catch (err) {
      console.log(`Error in findUser: ${err}`);
    }
    return null;
  }

  getLoggedInUser(): string | null{
    const user=localStorage.getItem("token");
    // console.log(user);
    return user==null ? null :JSON.parse(user);
  }
  
}
