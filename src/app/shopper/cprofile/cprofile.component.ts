import { Component } from '@angular/core';
import { CutomerService } from '../../authentication-service/customer/cutomer.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cprofile',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './cprofile.component.html',
  styleUrl: './cprofile.component.css'
})
export class CprofileComponent {
  constructor(private custAuth: CutomerService) { }

  cupdateInfo:any={
    name: '',
    email: ''
  }

  cuser: any | undefined;

  ngOnInit(): void {
    this.customerProfile();
    this.customerAddredd()

  }
  customerProfile() {
    const profileObservable$ = this.custAuth.getCustProfile();
    profileObservable$.subscribe({
      next: (value: any) => {
        console.log("Here is value")
        console.log(value);
        console.log("All user is calling")
        this.cuser = value;
        console.log(this.cuser);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

  }

  updateCustProfile() {
    this.custAuth.patchCustProfile(this.cupdateInfo).subscribe({
      next: (value) => {
        console.log("Succesfully updated the user profile", value);
        this.customerProfile();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  CImages: File | null = null;


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.CImages = input.files[0];
      // this.convertToBase64(this.CImages);
      this.handleUpdateCustImage();
    }
  }
  // convertToBase64(file: File): void {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64String = reader.result as string; // The result will be a base64 encoded string
  //     this.handleUpdateCustImage(base64String); // Call the upload function with the base64 string
  //   };
  //   reader.readAsDataURL(file); // This will trigger reader.onloadend once the file is converted
  // }

  handleUpdateCustImage() {
    // console.log(picture);
    if (this.CImages != null) {
      this.custAuth.patchCustImage(this.CImages).subscribe({
        next: (value) => {
          console.log("Succesfully Updated the Image");
          this.customerProfile();

        },
        error: (err) => {
          console.log("Did't Got the Image", err);
        }
      });
    }

  }



  //Deleting Customer Image
  DeleteCustImage() {
    this.custAuth.deleteCustImage().subscribe({
      next: (value) => {
        console.log("Succesfully Deleted the Image", value);
        this.customerProfile();

      },
      error: (err) => {
        console.log(err);
      }
    })

  }

//Getting Cust add
  customerAddredd() {
    this.custAuth.getCustAddress().subscribe({
      next: (value) => {
        console.log("Succesfully Got Cust Addredd", value);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }


  //Add New Address
  cnewAdd={
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: ''
  }
  addNewAddress(){
    this.custAuth.postCustAdd(this.cnewAdd).subscribe({next:(value)=>{
      console.log("Succesfully Posted New Addredd",value);
      this.customerAddredd()
    },
    error:(err)=>{
      console.log(err);
    }
  })

  }

}
