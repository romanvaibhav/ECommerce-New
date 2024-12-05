import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartProduct } from '../../../store/reducer/cart.reducer';
import { selectCartProducts, selectTotalPrice, selectTotalQuantity } from '../../../store/selector/cart.selector';
import { decreaseQuantity, increaseQuantity, removeProduct } from '../../../store/action/cart.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  products: Observable<CartProduct[]>;
  totalQuantity: Observable<number>;
  totalPrice: Observable<number>;



  cart$?:Observable<[]>;

  constructor(private store: Store) {
    this.products = this.store.select(selectCartProducts);
    this.totalQuantity = this.store.select(selectTotalQuantity);
    this.totalPrice = this.store.select(selectTotalPrice);
  }

  ngOnInit():void{
    console.log(this.products);
  }


  increaseQuantity(productId: string) {
    this.store.dispatch(increaseQuantity({ productId }));
  }

  decreaseQuantity(productId: string) {
    this.store.dispatch(decreaseQuantity({ productId }));
  }

  removeProduct(productId: string) {
    this.store.dispatch(removeProduct({ productId }));
  }

}
