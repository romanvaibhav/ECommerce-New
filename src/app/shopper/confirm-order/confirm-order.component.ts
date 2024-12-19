import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private custAust:CutomerService) { }
  orders: any;

  ngOnInit(): void {
    this.orders = this.route.snapshot.paramMap.get('id');
    console.log("Got All The Order Details", this.orders);
    
  }

  paymentDetails = {
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  }

  makePayment(orderId:string){
    console.log("Printing OrderID",orderId);
    this.custAust.putCustConfirmOrder(this.paymentDetails,orderId).subscribe({next:(value:any)=>{
      console.log("Payment Succesfull",value)
    },
    error:(err:any)=>{
      console.log("Error while making Payment",err.message);
    }
  })
console.log(this.paymentDetails)
  }

}
