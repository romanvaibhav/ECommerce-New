import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../authentication-service/authentication-service.service';
import { Tuser } from '../../models/user.type';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private authService: AuthenticationServiceService){}

  Puser:[]=[];
  productList={
    name: '',
    sortBy: '',
    page: 1,
    limit: 0,
  }

  SortByList = [
    { value: '', label: '' },
    { value: 'name', label: 'name' },
    { value: 'sortBy', label: 'sortBy' },
    { value: 'role', label: 'role' }];

  SortBylimit: number[]=[1,2,3,4,5,10,15,10,25,30];
  TotalPage:number[]=[];
  currentPage:number=1
  SortByPage(){
    this.TotalPage=Array.from({ length:this.currentPage}, (_, i) => i+1);
    console.log(this.TotalPage);
  }

  clearAll(){
    this.productList={
      name: '',
      sortBy: '',
      limit: 0,
      page: 1,
    }
    // this.listUser();
  }

  onChange(event:any){
    console.log("getting product List");
    this.handleProductList();
    }


    // Fetching the producting By Filtering
  handleProductList(){
    this.authService.getProductList(this.productList).subscribe({next : (value)=>{
      console.log("We got Product List :Value",value)
      // this.currentPage=value.totalPage;
      // this.Puser = value['result'] as [];

    },
    error: (err)=>{
      console.log("We are getting error while fetching the users",err)
    }
  })
  }


  //Creating the Product
  prodName:string=''; 
  prodDescription:string='';
  prodImages:File[]=[]; 
  prodPrice:number=0; 
  imageUrls:string[]=[];
  openCreateProduct(){

  }

  onFileUpload(event:Event):void{
    const input=event.target as HTMLInputElement;
    if(input.files){
      this.prodImages=Array.from(input.files);
      this.imageUrls=this.prodImages.map(file => URL.createObjectURL(file));
    }
  }
  handleCreateProduct(){
    this.authService.postCreateProduct(this.prodName,this.prodImages,this.prodPrice,this.prodDescription).subscribe({next:(value)=>{
      console.log("Post Create user run succesfully",value);
    },
    error:(err)=>{
      console.log("Got error in the handleCreateProduct",err);
    }
  })

  }

}
