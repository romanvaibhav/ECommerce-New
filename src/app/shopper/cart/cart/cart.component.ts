import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartProduct, cartStore } from '../../../store/reducer/cart.reducer';
import { selectCartProduct, selectCartProducts, selectTotalPrice, selectTotalQuantity } from '../../../store/selector/cart.selector';
import { clearAllProduct, decreaseQuantity, increaseQuantity, removeProduct } from '../../../store/action/cart.action';
import { CommonModule } from '@angular/common';
import { ClocalService } from '../../services/clocal-auth/clocal.service';
import { CutomerService } from '../../../authentication-service/customer/cutomer.service';
import { checkoutD, custAdd ,checkoutList} from '../../../models/user.type';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
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


  cart: any;

  constructor(private store: Store, private localservice: ClocalService, private cstore: Store<{ cart: cartStore }>, private custAuth: CutomerService,private router: Router) {
    this.products = this.store.select(selectCartProducts);
    this.totalQuantity = this.store.select(selectTotalQuantity);
    this.totalPrice = this.store.select(selectTotalPrice);
    // this.products = store.select(state => .cart.products);

    console.log("This is My cart ", this.products);
  }

  items:any;
  ngOnInit(): void {
    this.cart= this.store.select(selectCartProduct);
    this.products = this.store.select(selectCartProducts);

    console.log("Here we got products", this.cart);
    this.customerAddredd();
    this.items = this.localservice.getCartFromLocalStorage();
    console.log("Getting Data From LocalStorage",this.items);


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


  //Getting Cust address
  cAdd: custAdd[] = [];
  customerAddredd() {
    this.custAuth.getCustAddress().subscribe({
      next: (value) => {
        console.log("Succesfully Got Cust Addredd", value);
        this.cAdd = value as [];
        console.log("We got address here", this.cAdd);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //Selecting Address onSelect
  selectedIndex: number | null = null;
  selectedadd: custAdd | undefined;
  onSelect(loc: any, index: number) {
    this.selectedIndex = index;
    this.selectedadd = loc;
    console.log("selected Addess is here", this.selectedadd)
  }


// Clearning ALL the Cart
  clearAll(){
    console.log("Clear All Products is Calling")
    this.store.dispatch(clearAllProduct({ productId: 'clearAll' }));
  }


  checkoutData: checkoutD[] = [];

  proceedToBuy(){
let FinalPrice=0;
    this.totalPrice.subscribe({next:(value)=>{
      FinalPrice=value;
    }})


  this.store.select(selectCartProduct).subscribe(cartData=>{
    console.log("Getting proceedtobuy cart data",cartData);
    this.cart.subscribe({next:(value:any)=>{
      this.checkoutData=value.map((prod:any)=>({
        productId: prod._id,
        name: prod.name,
        price: prod.price,
        qty: prod.quantity,
        subTotal: prod.price * prod.quantity
      }));

    }})
    
    const checkoutList:checkoutList={
      items:this.checkoutData,
      deliveryFee:0,
      total:FinalPrice,
      address:this.selectedadd!
    }

    console.log("This is checkoutList final Data",checkoutList)

    //Creating Order
    this.custAuth.postCreateCustOrder(checkoutList).subscribe({next:(value:any)=>{
      console.log("Succesfully Posted the Data",value);
      const orderId = value.order._id;
      this.router.navigateByUrl(`/order/cart/${orderId}`)
    },
    error:(err:any)=>{
      console.log("We got error in the postcreateOrder");
    }
  })

  })


  }

}
