import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../authentication-service/authentication-service.service';
import { ProdImg, ProdList, Tuser } from '../../models/user.type';
import { ChangeDetectorRef } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { Editor } from 'primeng/editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule,Dialog, ButtonModule, InputTextModule, Editor],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private authService: AuthenticationServiceService,private router:Router) { }

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
  getInfo(item: any) {
    console.log('Row clicked:', item);

    this.router.navigate(['/seller/editProd'], {
      state: { user: item }
    });
    
    // this.authService.getOneProduct(item._id).subscribe({
    //   next: (value: any) => {
    //     console.log("Here i got One Product yeaaa");
    //     this.onePuser = value;
    //     this.isOpenupdating=true;

    //     console.log(this.onePuser);
    //   }
    // })
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
    this.ClickedImage=this.imageUrls[0];
  }

  handleCreateProduct() {
    console.log(this.prodDescription);
    this.authService.postCreateProduct(this.prodName, this.prodImages, this.prodPrice, this.prodDescription).subscribe({
      next: (value) => {
        console.log("Post Create user run succesfully", value);
        this.prodName = '';
        this.prodDescription = '';
        this.prodImages = [];
        this.prodPrice = 0;
        this.imageUrls = [];
        this.handleProductList();
      },
      error: (err) => {
        console.log("Got error in the handleCreateProduct", err);
      }
    })
  }





  isvisible: boolean = false;


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
  updateprodImages: File[] = [];
  updateimageUrls: string[] = [];
  deletedImageId:string []=[];
  onFileUpdate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.updateprodImages = Array.from(input.files);
      this.createupdateImageUrl(this.updateprodImages)
    }
  }

  private createupdateImageUrl(file: any): void {
    this.updateimageUrls = this.updateprodImages.map(file => URL.createObjectURL(file));
  }

  onImageClick(parameter: any) {
    if (typeof parameter === 'string' && parameter.startsWith('training')) {
      console.log("Main image")
      this.deletedImageId.push(parameter);
      //Here we also have to store the deleted ids
      this.onePuser.images = this.onePuser.images.filter(image => image.public_id !== parameter);

    } else {
      console.log("Local Image")
      this.updateimageUrls=this.updateimageUrls.filter(URL=>URL !==parameter);
    }
  }
  //Here we have to pass the deleted Images Public ID to delete the image from server 
  //The function is not working
  updateOneProductImage(public_id:string){
    this.authService.patchUpdateProductImage({new_images:this.updateprodImages,delete:this.deletedImageId},public_id).subscribe({next: (value)=>{
      console.log("Succesfully updated The image",value);
      this.updateprodImages= [];
      this.updateimageUrls= [];
      this.deletedImageId=[]
    },
  error:(err)=>{
    console.log(err);
  }})
    
    
  }



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




  //For the create Product Modal when Cliked On Image
  ClickedImage:any;
  onClickImage(Img:any){
    this.ClickedImage=Img;
  }

  //PrimeNg modal for product creation
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
}
