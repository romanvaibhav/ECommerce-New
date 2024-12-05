// cart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartStore } from '../reducer/cart.reducer';



export const selectCartState = createFeatureSelector<cartStore>('cart');
export const selectCartProducts = createSelector(
  selectCartState,
  (state: cartStore) => state.products
);

export const selectTotalQuantity = createSelector(
  selectCartState,
  (state: cartStore) => state.totalQuantity
);

export const selectTotalPrice = createSelector(
  selectCartState,
  (state: cartStore) => state.totalPrice
);
