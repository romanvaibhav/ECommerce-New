import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartProduct } from '../../../store/reducer/cart.reducer';

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
  getCartFromLocalStorage(): Observable<CartProduct[]> {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const products = JSON.parse(cartData).products || [];
      return of( products); // Wrap products in an observable using 'of'
    }
    return of([]); // Return an empty array if no data is found
  }
}
