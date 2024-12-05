//ngrcR
import {createReducer, on} from "@ngrx/store"
import { cartImg, cartorg } from "../../models/user.type";
import { AddToCart, decreaseQuantity, increaseQuantity, removeProduct } from "../action/cart.action";

export type cartStore = {
    products:CartProduct[];
    totalPrice: number;
    totalQuantity: number;
  }

  export interface CartProduct{
    createdAt: string,
    description: string,
    images: cartImg[],
    name: string,
    price: number,
    _id: string,
    _org: cartorg[],
    quantity: number;
  }

  export const initialState: cartStore = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0
  };



// const initialState:cartStore[]=[];

export const cartReducer=createReducer(
    initialState,
    on(AddToCart,(state,{product})=>{
        //Checking if product already Exist


        // const existingItem = state.products.find(cartItem => cartItem._id === product._id);

        // if (existingItem) {
        //     // Update quantity if the item already exists
        //     return state.products.map(cartItem =>
        //       cartItem._id === product._id ? { ...cartItem, quantity: cartItem.quantity + product.quantity }: cartItem
        //     );
        //   } else {
            // Add new item to the cart
            // return [...state, item];


            const updatedProducts = [...state.products, product];
            // state.products.quantity=1
            const updatedQuantity = (product.quantity || 0) + 1;
            const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 1), 0);
            const totalPrice = updatedProducts.reduce((acc, prod) => acc + (prod.price * (prod.quantity || 1)), 0);
    
            console.log(state);
            console.log(product);
            return { ...state,quantity:updatedQuantity ,products: updatedProducts, totalQuantity, totalPrice };
        //   }

    }),




    on(increaseQuantity, (state, { productId }) => {
        const updatedProducts = state.products.map(product => {
          if (product._id === productId) {
            const updatedQuantity = (product.quantity || 0) + 1; // Ensure quantity is at least 0
            const updatedTotalPrice = updatedQuantity * (product.price || 0); // Ensure price is at least 0
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
          }
          return product; // Return unchanged product
        });
      
        // Recalculate totals for the entire cart
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 0), 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.price || 0) * (prod.quantity || 0)), 0);
      
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      }),
      



    

      on(decreaseQuantity, (state, { productId }) => {
        const updatedProducts = state.products.map(product => {
          if (product._id === productId && product.quantity > 1) {
            const updatedQuantity = product.quantity - 1; // Decrease the quantity by 1
            const updatedTotalPrice = updatedQuantity * (product.price || 0); // Recalculate total price
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
          }
          return product; // Return unchanged product
        });
      
        // Recalculate the totalQuantity and totalPrice
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 0), 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.price || 0) * (prod.quantity || 0)), 0);
      
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      }),
      



      on(removeProduct, (state, { productId }) => {
        const updatedProducts = state.products.filter(product => product._id !== productId);
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + prod.quantity, 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + prod.price, 0);
        
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      })

);