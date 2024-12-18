import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { cartStore } from '../reducer/cart.reducer';
import { AddToCart, clearAllProduct, decreaseQuantity, increaseQuantity, loadCartFromLocalStorage, removeProduct } from '../action/cart.action';

@Injectable()
export class cartEffect {
  constructor() {}
  private actions$ = inject(Actions);
  private _store = inject(Store);
  saveCartToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddToCart,clearAllProduct, increaseQuantity, decreaseQuantity, removeProduct), // Actions to listen for
        tap(() => {
          // Access the cart state and save it to localStorage
          this._store.select('cart').subscribe(cartState => {
            localStorage.setItem('cart', JSON.stringify(cartState));
          });
        })
      ),
    { dispatch: false } // Prevent further action dispatch
  );

  loadCartFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] App Init'),
      tap(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const products = JSON.parse(cartData).products || [];
          this._store.dispatch(loadCartFromLocalStorage({ products }));
        }
      })
    ),
    { dispatch: false } // No further actions dispatched from this effect
  );
}
