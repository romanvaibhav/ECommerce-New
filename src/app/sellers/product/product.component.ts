import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../authentication-service/authentication-service.service';
import { ProdImg, ProdList, Tuser } from '../../models/user.type';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private authService: AuthenticationServiceService) { }

  Puser: ProdList[] = [];
  onePuser: {
    createdAt: string,
    deleted: boolean,
    description: string,
    images: ProdImg[],
    name: string,
    price: number
    updatedAt: string
    _id: string
    _org: string
  } = {
      createdAt: '',
      deleted: false,
      description: '',
      images: [],
      name: '',
      price: 0,
      updatedAt: '',
      _id: '',
      _org: ''
    };


  productList = {
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

  SortBylimit: number[] = [1, 2, 3, 4, 5, 10, 15, 10, 25, 30];
  TotalPage: number[] = [];
  currentPage: number = 1
  SortByPage() {
    this.TotalPage = Array.from({ length: this.currentPage }, (_, i) => i + 1);
    console.log(this.TotalPage);
  }

  clearAll() {
    this.productList = {
      name: '',
      sortBy: '',
      limit: 0,
      page: 1,
    }
    // this.listUser();
  }

  onChange(event: any) {
    console.log("getting product List");
    this.handleProductList();
  }

  ngOnInit(): void {
    // Initialization logic here
    this.handleProductList();
    // this.onRowClick()
  }

  // Fetching the producting By Filtering
  handleProductList() {
    this.authService.getProductList(this.productList).subscribe({
      next: (value: any) => {
        console.log("We got the product list");
        this.currentPage = value.totalPage;
        this.SortByPage()
        this.Puser = value['results'] as [];
        console.log("Here is Puser")
        console.log(this.Puser);
      },
      error: (err) => {
        console.log("We are getting error while fetching the users", err)
      }
    })
  }


  //Getting Data Of One User
  isOpenupdating:boolean=false;
  onRowClick(item: any) {
    console.log('Row clicked:', item);
    this.authService.getOneProduct(item._id).subscribe({
      next: (value: any) => {
        console.log("Here i got One Product yeaaa");
        this.onePuser = value;
        this.isOpenupdating=true;
        console.log(this.onePuser);

      }
    })
  }



  //Creating the Product
  prodName: string = '';
  prodDescription: string = '';
  prodImages: File[] = [];
  prodPrice: number = 0;
  imageUrls: string[] = [];
  openCreateProd: boolean = false;
  openCreateProduct() {
    this.openCreateProd = !this.openCreateProd

  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.prodImages = Array.from(input.files);
      this.createImageUrl(this.prodImages)
    }
  }

  private createImageUrl(file: any): void {
    this.imageUrls = this.prodImages.map(file => URL.createObjectURL(file));
  }

  handleCreateProduct() {
    this.authService.postCreateProduct(this.prodName, this.prodImages, this.prodPrice, this.prodDescription).subscribe({
      next: (value) => {
        console.log("Post Create user run succesfully", value);
        this.prodName = '';
        this.prodDescription = '';
        this.prodImages = [];
        this.prodPrice = 0;
        this.imageUrls = [];
      },
      error: (err) => {
        console.log("Got error in the handleCreateProduct", err);
      }
    })
  }



  //Updating One Product
  updateOneProductList = {
    name:'',
    description: '',
    price: 0
  }
  updateOneProduct(prodId: string) {
    this.authService.patchUpdateProduct(this.updateOneProductList,prodId).subscribe({next:(value)=>{
      console.log("Updated Product Succesfully");
      this.handleProductList();
      this.updateOneProductList = {
        name:'',
        description: '',
        price: 0
      }

    },
    error:(err)=>{
      console.log(err);
    }
  })
  }


  //Updating Product Image

  //   onImageClick(){
    
  // }
  // updateOneProductImage(event: Event, public_id: string):void{
  //   const input = event.target as HTMLInputElement;
  //   let updateProductImage:File[]=[];
  //   if (input.files) {
  //     updateProductImage = Array.from(input.files);
  //     this.authService.patchUpdateProductImage(updateProductImage,public_id).subscribe({next:(value:any)=>{
  //       console.log("Succesfully Changed the Image",value);
  //     },
  //   error:(err:any)=>{
  //     console.log("Getting error in updateOneProductImage",err);
  //   }})
  //   }
  // }



  //Deleting Product Images

  deleteOneProduct(prodId:string){
    this.authService.deleteProduct(prodId).subscribe({next: (value)=>{
      console.log("Images Deleted Succesfully");
      this.handleProductList();
    },
    error:(err)=>{
      console.log("Getting Error While Deleting the Product");
    }
  })

  }
}
