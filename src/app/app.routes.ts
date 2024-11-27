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
export const routes: Routes = [
    {
        path:'',
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:"login",
        component:LoginComponent,
    },
    {
        path:"profile",
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
        path:"auth",
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
];
