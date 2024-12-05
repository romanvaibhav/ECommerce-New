// cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { CartProduct, cartStore } from '../reducer/cart.reducer';

export const AddToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: CartProduct }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ productId: string }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ productId: string }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ productId: string }>()
);
