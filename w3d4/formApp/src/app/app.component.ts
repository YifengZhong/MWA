import { Component } from '@angular/core';
import {HttpSrv} from './httpSrv/httpSrv.comp'

@Component({
  selector: 'app-root',
  template: `
  <div class="col-md-6 col-md-offset-3">
    <data-driven></data-driven>
    <hr>
  </div>
`,
  providers: [HttpSrv]
})
export class AppComponent {
  title = 'app';
}
