import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'CounterComp',
  template: `
              <p>
                <button (click)="counterChange(-1)">-</button>
                <label >{{cnValue}}</label> 
                <button (click)="counterChange(1)">+</button>
              </p>

            `,

})
export class CounterComp {
      @Input() cnValue:number = 0;
      @Output() messageEmitter = new EventEmitter();
      counterChange(num:number){
        this.cnValue = this.cnValue + num;
        this.messageEmitter.emit(this.cnValue);

      }
}
