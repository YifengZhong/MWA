import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
            <h1>CounterComponent:</h1>
            
            <p>
                CounterComponent:
                <input type="number" [value]="counter" (input)="counter=$event.target.value">
                <CounterComp [cnValue]="counter" (messageEmitter)="showOutputData($event)"></CounterComp>

            </p>
            <p>
                Component Counter Value {{counter}}.
            </p>            
            `,

})
export class AppComponent {

  private _counter:number = 0;
  set counter(cnt:number) {
    this._counter = cnt;
  }
  get counter() {
    return this._counter;
  }
  showOutputData(data){
    this.counter = data;
    }
  // emitMinusMessage() {
  //   this.outPutDate--;
  //   //this.messageEmitter.emit(this.data);
  // }
  // emitPlusMessage() {
  //   this.outPutDate++;
  //   //this.messageEmitter.emit(this.data);
  // }
}
