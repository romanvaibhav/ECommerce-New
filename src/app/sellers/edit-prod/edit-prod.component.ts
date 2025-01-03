import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdImg } from '../../models/user.type';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../authentication-service/authentication-service.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-prod',
  standalone: true,
  imports: [CommonModule,FormsModule,Dialog, ButtonModule, InputTextModule],
  templateUrl: './edit-prod.component.html',
  styleUrl: './edit-prod.component.css'
})
export class EditProdComponent {
  user: any;

  constructor(private router: Router,private authService: AuthenticationServiceService) {}
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

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


  ngOnInit():void{
    this.onePuser = history.state.user;
    if (!this.onePuser) {
      console.log('No product data received!');
    }
    else{
      console.log("Got the Product",this.onePuser);
    }
  }

  onImageClick(parameter: any) {
    debugger
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


  //Updating Product Image

  onFileUpdate(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.updateprodImages = Array.from(input.files);
      this.createupdateImageUrl(this.updateprodImages)
    }
  }

  private createupdateImageUrl(file: any): void {
    this.updateimageUrls = this.updateprodImages.map(file => URL.createObjectURL(file));
    console.log(this.updateimageUrls)
  }



    //Here we have to pass the deleted Images Public ID to delete the image from server 
  //The function is not working
  updateprodImages: File[] = [];
  deletedImageId:string []=[];
  updateimageUrls: string[] = [];

  updateOneProductImage(public_id:string){
    console.log(public_id);
    console.log(this.updateprodImages);
    console.log(this.updateimageUrls);
    console.log(this.deletedImageId);
    this.authService.patchUpdateProductImage({new_images:this.updateprodImages,delete:this.deletedImageId},public_id).subscribe({next: (value:any)=>{
      console.log("Succesfully updated The image",value);
      this.onePuser=value
      this.updateprodImages= [];
      this.updateimageUrls= [];
      this.deletedImageId=[]
    },
  error:(err:any)=>{
    console.log(err);
  }})
    
    
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
      this.updateOneProductList = {
        name:'',
        description: '',
        price: 0
      }

    },
    error:(err:any)=>{
      console.log(err);
    }
  })
  }




  //Deleting Product Images

  deleteOneProduct(prodId:string){
    this.authService.deleteProduct(prodId).subscribe({next: (value)=>{
      console.log("Images Deleted Succesfully");
    },
    error:(err)=>{
      console.log("Getting Error While Deleting the Product");
    }
  })

  }
}
