import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClocalService {

  constructor() { }

  getcLoggedInUser(): string | null{
    const user=localStorage.getItem("custToken");
    // console.log(user);
    return user==null ? null :JSON.parse(user);
  }
}
