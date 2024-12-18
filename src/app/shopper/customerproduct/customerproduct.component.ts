import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CutomerService} from "./../../authentication-service/customer/cutomer.service"
import { cartData, customerProductList } from '../../models/user.type';
import { AddToCart } from '../../store/action/cart.action';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-customerproduct',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './customerproduct.component.html',
  styleUrl: './customerproduct.component.css'
})
export class CustomerproductComponent implements OnInit {

  constructor(private custAuth:CutomerService,private store: Store){}


  Cuser: customerProductList[] = [];

  CproductList = {
    name: '',
    sortBy: '',
    page: 1,
    limit: 0,
  }
  SortByList = [
    { value: '', label: '' },
    { value: 'name', label: 'name' },
    { value: 'sortBy', label: 'sortBy' },
    { value: 'price', label: 'price' }];

  SortBylimit: number[] = [1, 2, 3, 4, 5, 10, 15, 10, 25, 30];
  TotalPage: number[] = [];
  currentPage: number = 1;

  SortByPage() {
    this.TotalPage = Array.from({ length: this.currentPage }, (_, i) => i + 1);
    console.log(this.TotalPage);
  }

  clearAll() {
    this.CproductList = {
      name: '',
      sortBy: '',
      limit: 0,
      page: 1,
    }
    this.handleCProductList();
  }

  ngOnInit(): void {
    this.handleCProductList();
  }

  onChange(event:any){
    this.handleCProductList()
  }

  handleCProductList() {
    this.custAuth.getCustProductList(this.CproductList).subscribe({
      next: (value: any) => {
        console.log("We got the Customer product list",value);
        this.currentPage = value.totalPages;
        this.SortByPage()
        this.Cuser = value['results'] as [];
        console.log("Here is Puser")
        // console.log(this.Cuser);
      },
      error: (err) => {
        console.log("We are getting error while fetching the users", err)
      }
    })
  }

  // cart:cartData[]=[]
  addToCart(prod:any){
    console.log("Here is the Product",prod);

    this.store.dispatch(AddToCart({product:prod}))
    // this.cart.push(prod);
    // localStorage.setItem("cartData", JSON.stringify(this.cart));
    // Add new products to the cart array (using spread syntax)
  }


}
