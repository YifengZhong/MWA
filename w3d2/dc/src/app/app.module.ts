import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChildComponent} from './child/cld.comp';
import { MyDirective1Directive } from './child/directive1.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    MyDirective1Directive
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
