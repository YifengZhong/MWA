import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// use FormsModule Only when using Template Driven Forms
import { FormsModule } from '@angular/forms';
// use ReactiveFormsModule Only when using Template Driven Forms
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import {DrivenFormComponent} from './driven_form/data_driven.comp'

@NgModule({
  declarations: [
    DrivenFormComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
