import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-open-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-product.component.html',
  styleUrl: './open-product.component.css'
})
export class OpenProductComponent {

  product: any;

  ngOnInit() {
    // Access the passed data from the router's state
    this.product = history.state.product;
    if (!this.product) {
      console.log('No product data received!');
    }
    else{
      console.log("Got the Product",this.product);
    }
  }
}
