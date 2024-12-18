//ngrcR :- All Reducers are here   1(Reducer)
import {createReducer, on} from "@ngrx/store"
import { cartImg, cartorg } from "../../models/user.type";
import { AddToCart, clearAllProduct, decreaseQuantity, increaseQuantity, removeProduct } from "../action/cart.action";
import { loadCartFromLocalStorage } from '../action/cart.action'; // Adjust path as needed

export type cartStore = {
    products:CartProduct[];
    totalPrice: number;
    totalQuantity: number;
  }

  export type cartdeal = {
    discount: string,
    ends: string,
    price: number
  }
  export interface CartProduct{
    createdAt: string,
    description: string,
    images: cartImg[],
    name: string,
    deal?: cartdeal,
    price: number,
    _id: string,
    _org: cartorg[],
    quantity: number;
    totalPrice:number;
  }
  export const initialState: cartStore = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0
  };

// const initialState:cartStore[]=[];
export const cartReducer=createReducer(
    initialState,
    //Reducer PEforms when we add the product
    on(AddToCart,(state,{product})=>{
        //Checking if product already Exist
        const existingItem = state.products.find(cartItem => cartItem._id === product._id);
        if (existingItem) {
          // Update quantity if the item already exists
          const updatedProducts = state.products.map(cartItem =>
            cartItem._id === product._id
              ? { ...cartItem, quantity: cartItem.quantity + 1,totalPrice: cartItem.deal?cartItem.deal.price * (cartItem.quantity + 1):cartItem.price * (cartItem.quantity + 1) } // Increment quantity
              : cartItem
          );
          const totalQuantity = updatedProducts.reduce((acc, prod) => acc + prod.quantity, 0);
          const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.deal?prod.deal.price:prod.price) * prod.quantity), 0);
      
          return { ...state, products: updatedProducts, totalQuantity, totalPrice };
          } else {

          //Setting quantity to 1 when product is added
            const productWithQuantity: CartProduct = {
              ...product,
              quantity: 1,
              totalPrice: product.deal ? product.deal.price * 1 : product.price * 1            };
            //Updatng Product adding the Product
            const updatedProducts = [...state.products, productWithQuantity];
            const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 1), 0);
            const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.deal?prod.deal.price:prod.price) * (prod.quantity || 1)), 0);
  
            console.log(state);
            console.log(product);
            return { ...state, products: updatedProducts, totalQuantity, totalPrice };
          }
    }),



    //Reducer PEforms when we increase the product qantity
    on(increaseQuantity, (state, { productId }) => {
        const updatedProducts = state.products.map(product => {
          if (product._id === productId) {
            const updatedQuantity = (product.quantity || 0) + 1; // Ensure quantity is at least 0
            const updatedTotalPrice = updatedQuantity * ((product.deal?product.deal.price:product.price) || 0); // Ensure price is at least 0
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
          }
          return product; // Return unchanged product
        });
        // Recalculate totals for the entire cart
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 0), 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.price || 0) * (prod.quantity || 0)), 0);
      
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      }),
      



    
    //Reducer PEforms when we Decrease the product qantity

      on(decreaseQuantity, (state, { productId }) => {
        const updatedProducts = state.products.map(product => {
          if (product._id === productId && product.quantity > 1) {
            const updatedQuantity = product.quantity - 1; // Decrease the quantity by 1
            const updatedTotalPrice = updatedQuantity * ((product.deal?product.deal.price:product.price) || 0); // Recalculate total price
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice };
          }
          return product; // Return unchanged product
        });
        // Recalculate the totalQuantity and totalPrice
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 0), 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.price || 0) * (prod.quantity || 0)), 0);
      
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      }),
      

    //Reducer PEforms when we REMOVE the product

      on(removeProduct, (state, { productId }) => {
        const updatedProducts = state.products.filter(product => product._id !== productId);
        const totalQuantity = updatedProducts.reduce((acc, prod) => acc + (prod.quantity || 0), 0);
        const totalPrice = updatedProducts.reduce((acc, prod) => acc + ((prod.deal?prod.deal.price:prod.price || 0) * (prod.quantity || 0)), 0);
        
        return { ...state, products: updatedProducts, totalQuantity, totalPrice };
      }),


      //Reducer to retreve data fromlocalsorage
      on(loadCartFromLocalStorage, (state, { products }) => ({
        ...state,
        products,
        totalPrice: products.reduce((acc, prod) => acc + (prod.deal?prod.deal.price:prod.price) * prod.quantity, 0),
        totalQuantity: products.reduce((acc, prod) => acc + prod.quantity, 0),
      })),


      on(clearAllProduct, (state, { productId }) => {
        if (productId === 'clearAll') {
          // Clear all products and reset totals
          return { 
            ...state, 
            products: [], 
            totalQuantity: 0, 
            totalPrice: 0 
          };
        }
        return state;
      }),
      


);