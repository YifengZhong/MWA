import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { myRoutes } from "./app.routes";
import {HomeComponent} from './home/home.component';
import {StudentsComponent} from './student/student.component'
import {RouteComponent} from "./student/profile/profile.component";
import { MyCanActivateGuard } from "./guard/mycanactivate.guard";
import {StudentDataSrv} from './student/studentData'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    RouteComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    myRoutes
  ],
  providers: [MyCanActivateGuard,StudentDataSrv],
  bootstrap: [AppComponent]
})
export class AppModule { }
