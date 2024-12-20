import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../../authentication-service/authentication-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sellerorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sellerorder.component.html',
  styleUrl: './sellerorder.component.css'
})
export class SellerorderComponent {

  constructor(private sellerAuth:AuthenticationServiceService){}

  ngOnInit():void{
    this.sellerOrders();
  }

  sellerOrder:any;
  sellerOrders(){
    this.sellerAuth.getSellerOrderHistory().subscribe({next:(value:any)=>{
      console.log("We got seller order history",value);
      this.sellerOrder=value;
      console.log("Got the seller orders",this.sellerOrder);

    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }


  cancleOrder(orderId:string){
    const msg='cancel'
    this.sellerAuth.pathcOrderAction(orderId,msg).subscribe({next:(value:any)=>{
      console.log("Here is the value",value);
      this.sellerOrders();

    },
    error:(err:any)=>{
      console.log(err);
    }
  })

  }
  dispatchOrder(orderId:string){
    const msg='dispatch'
    this.sellerAuth.pathcOrderAction(orderId,msg).subscribe({next:(value:any)=>{
      console.log("Here is the value",value);
      this.sellerOrders();

    },
    error:(err:any)=>{
      console.log(err);
  }})
  }


  deliverOrder(orderId:string){
    const msg='deliver'
    this.sellerAuth.pathcOrderAction(orderId,msg).subscribe({next:(value:any)=>{
      console.log("Here is the value",value);
      this.sellerOrders();

    },
    error:(err:any)=>{
      console.log(err);
    }})
  }

}
