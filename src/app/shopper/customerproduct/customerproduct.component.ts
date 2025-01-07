import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CutomerService} from "./../../authentication-service/customer/cutomer.service"
import { cartData, customerProductList } from '../../models/user.type';
import { AddToCart } from '../../store/action/cart.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import {ToasterService} from './../services/toaster/toaster.service'

@Component({
  selector: 'app-customerproduct',
  standalone: true,
  imports: [CommonModule,FormsModule,Toast, ButtonModule, Ripple],
  templateUrl: './customerproduct.component.html',
  styleUrl: './customerproduct.component.css'
})
export class CustomerproductComponent implements OnInit {

  constructor(private toastService:ToasterService ,private custAuth:CutomerService,private store: Store,private router: Router,private messageService: MessageService){}
  private hasShown = false;

  Cuser: customerProductList[] = [];

  CproductList = {
    name: '',
    sortBy: '',
    page: 1,
    limit: 20,
  }
  SortByList = [
    { value: '', label: '' },
    { value: 'name', label: 'name' },
    { value: 'sortBy', label: 'sortBy' },
    { value: 'price', label: 'price' }];

  SortBylimit: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30,40,50];
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
    const hasShownFromStorage = localStorage.getItem('hasShown');
    this.hasShown = hasShownFromStorage === 'true';
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
        console.log("Here is Cuser",this.Cuser)
        let Verify=localStorage.getItem("custToken");
        if(!this.hasShown && Verify){
          this.showToast();
          this.hasShown=true;
        localStorage.setItem('hasShown', 'true');

        }

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
    this.toastService.showInfo('','Product Added To The Cart.');

    this.store.dispatch(AddToCart({product:prod}))
    // this.cart.push(prod);
    // localStorage.setItem("cartData", JSON.stringify(this.cart));
    // Add new products to the cart array (using spread syntax)
  }
isOpenTheDrop:boolean=false;
  openTheDropDown(){
    this.isOpenTheDrop=!this.isOpenTheDrop

  }
  onImageClick(Prod:any){
    console.log("Clicked on the image",Prod);
    this.router.navigate(['/cust/prodetail'], {
      state: { product:Prod } // Passing product data in state
    });

  }

  showToast(): void {
    this.toastService.showSuccess('', 'LoggedIn Succesfully');
  }

}
