import { Routes } from '@angular/router';
import { RegistrationComponent } from './sellers/auth/registration/registration.component';
import { LoginComponent } from './sellers/auth/login/login.component';
import { MyProfileComponent } from './sellers/Home/my-profile/my-profile.component';
import { authGaurdGuard } from './sellers/services/auth-guard/auth-gaurd.guard';
import {ProfileComponent} from './sellers/profile/profile/profile.component'
import { UsersComponent } from './sellers/profile/users/users.component';
import { ChangePasswordComponent } from './sellers/Settings/change-password/change-password.component';
import { ResetPasswordComponent } from './sellers/Settings/reset-password/reset-password.component';
import { VerifyAccountComponent } from './sellers/profile/verify-account/verify-account.component';
import { ProductComponent } from './sellers/product/product.component';
import { CustomerproductComponent } from './shopper/customerproduct/customerproduct.component';
import { CauthComponent } from './shopper/cauth/cauth.component';
import { CloginComponent } from './shopper/clogin/clogin.component';
import { CprofileComponent } from './shopper/cprofile/cprofile.component';
import { cauthGuard } from './shopper/services/cauth-guard/cauth.guard';
import { CartComponent } from './shopper/cart/cart/cart.component';
import { ConfirmOrderComponent } from './shopper/confirm-order/confirm-order.component';
import { OrderdetailsComponent } from './shopper/orderdetails/orderdetails.component';
export const routes: Routes = [


    //All are the Seller Routes Below
    {
        path:"seller/login",
        component:LoginComponent,
    },
    {
        path:"seller/profile",
        // component:ProfileComponent,
        canActivate:[authGaurdGuard],
        children: [ // Define child routes here
            {
                path:"users",
                component:UsersComponent,
            },
            {
                path:"myprofile",
                component:ProfileComponent,

            },
            {
                path:"changePass",
                component:ChangePasswordComponent,
            },
            {
                path:"products",
                component: ProductComponent,
            },
          ]
    },
    // {
    //     path:"users",
    //     component:UsersComponent,
    // },
    {
        path:"seller/auth",
        component:RegistrationComponent,
    },
    {
        path:"auth/verify-email",
        component:VerifyAccountComponent,
    },
    {
        path:"auth/reset-password",
        component:ResetPasswordComponent,
    },



    //Here all the Customer Routes Below
    {
        path:'',
        component:CustomerproductComponent,
    },
    {
        path:'auth/registration',
        component:CauthComponent,
    },
    {
        path:'auth/login',
        component:CloginComponent
    },
    {
        path:'auth/profile',
        component:CprofileComponent,
        canActivate:[cauthGuard],

    }
    ,
    {
        path:'auth/cart',
        component:CartComponent,
    },
    {
        path:'order/cart/:id',
        component:ConfirmOrderComponent,
    },
    {
        path:'order/orderdetails',
        component:OrderdetailsComponent,
    },

];
