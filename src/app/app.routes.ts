import { Routes } from '@angular/router';
import { RegistrationComponent } from './sellers/auth/registration/registration.component';
import { LoginComponent } from './sellers/auth/login/login.component';
import { MyProfileComponent } from './sellers/Home/my-profile/my-profile.component';
import { authGaurdGuard } from './sellers/services/auth-guard/auth-gaurd.guard';
import {ProfileComponent} from './sellers/profile/profile/profile.component'
import { UsersComponent } from './sellers/profile/users/users.component';
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
        component:ProfileComponent,
        // canActivate:[authGaurdGuard],
        // children: [ // Define child routes here
        //     {
        //         path:"users",
        //         component:UsersComponent,
        //     }
        //   ]
    },
    {
        path:"users",
        component:UsersComponent,
    },
    {
        path:"auth",
        component:RegistrationComponent,
    },
];
