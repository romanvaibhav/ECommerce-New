import { Component } from '@angular/core';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
  constructor(private custAuth:CutomerService, private router:Router){}
  OrderHist?:any;
  ngOnInit(): void {
    this.orderHistory();

  }


  orderHistory(){
    this.custAuth.getOrderHistory().subscribe({next:(value:any)=>{
      console.log("Succesfully got the data",value);
      this.OrderHist=value;
      this.currentPage=value.totalPages;
      this.SortByPage();
      console.log("Save the data in variable",this.OrderHist);
    },
  error:(err:any)=>{
    console.log(err);
  }})
  }



  cancleOrder(orderId:string){
    console.log(orderId);
    this.custAuth.patchCustCancleOrder(orderId).subscribe({next:(value:any)=>{
      console.log("succesfully Canceled the Order",value);
      this.orderHistory();
    },
  error:(err:any)=>{
    console.log("We are getting while cancling the order",err);
  }})

  }

  pendingPayment(orderId:string){
    this.router.navigateByUrl(`/order/cart/${orderId}`)

  }
  


  //Filtering functionality
  CproductList = {
    page: 1,
    limit: 10,
  }
  SortBylimit: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30,40,50];
  TotalPage: number[] = [];
  currentPage: number = 1;

  SortByPage() {
    this.TotalPage = Array.from({ length: this.currentPage }, (_, i) => i + 1);
    console.log(this.TotalPage);
  }

  onChange(event:any){
    this.FilterOrder();
  }

  //Filtering Orders
  FilterOrder(){
    this.custAuth.getFilterOrders(this.CproductList).subscribe({next:(value:any)=>{
      console.log("value",value);
      this.OrderHist=value;
      this.currentPage=value.totalPages;
      this.SortByPage();
    },
    error:(err)=>{
      console.log("Getting error While Filtering the orders");
    }
  })
  }
}
