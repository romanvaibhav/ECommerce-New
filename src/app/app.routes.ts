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
    }
];
