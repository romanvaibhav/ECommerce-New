import { Component } from '@angular/core';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [CommonModule],
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
  

}
