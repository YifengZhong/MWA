import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {StudentsComponent} from "./student/student.component";
import {RouteComponent} from "./student/profile/profile.component";
import {MyCanActivateGuard} from "./guard/mycanactivate.guard"

const MY_ROUTES: Routes = [
    {path: '', component:HomeComponent},
    {path: 'students', component:StudentsComponent,children:[
         {path: 'profile/:id', component: RouteComponent , canActivate:[MyCanActivateGuard]}
        ]},
   
    
];
 
export const myRoutes = RouterModule.forRoot(MY_ROUTES);
