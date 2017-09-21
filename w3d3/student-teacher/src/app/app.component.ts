import { Component } from '@angular/core';

import {StudentDataSrv} from './student/studentData'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
 // providers:[StudentDataSrv]
})
export class AppComponent {
  title = 'app';
}
