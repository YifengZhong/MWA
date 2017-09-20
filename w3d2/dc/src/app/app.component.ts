import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `  Add string to arrays: <input (input)="str=$event.target.value"/><br>
  <button (click)="onSubmit()">submit</button>
  <ChildComponent [resultArray]="resultArray" (messageEmitter)="showOutputData($event)"></ChildComponent>
  <div [ngSwitch]="data">
    <p *ngSwitchCase= 0>white</p>
    <p *ngSwitchCase= 1>black</p>
    <p *ngSwitchCase= 2>red</p>
    <p *ngSwitchCase= 3>green</p>
    <p *ngSwitchDefault></p>
  </div>
  
  `,

})
export class AppComponent {
  resultArray:Array<string> = new Array();
  str:string = "";
  data:number;
  onSubmit(){ 
    let tmp:Array<string> = new Array();
    this.resultArray.forEach(x=>tmp.push(x));
    this.resultArray = tmp;
    this.resultArray.push(this.str);
  }
  showOutputData(data) {
    console.log(data);
    this.data = data;
  }
}
