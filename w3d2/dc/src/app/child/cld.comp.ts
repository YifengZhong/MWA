import { Component,ChangeDetectionStrategy,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'ChildComponent',
  template: `

    <ul>
      <li upper *ngFor="let result of resultArray">{{result}}</li>
      <template [ngIf]="switch">
      <div>
        <li>{{resultArray[4]}}</li>
      </div>
      </template>
    </ul>
    <button (click)="onSwitch()">Switch</button>        
    <button (click)="onColor()">ChangeColor</button>        
  `,
  inputs: ['resultArray'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ChildComponent {
  resultArray:Array<string>;
  @Output() messageEmitter = new EventEmitter();
  colorIndex:number = 0;
  private switch = true;
  ngOnChanges(inputChanges){
    console.log('Person is Changed!');
  }
  onSwitch() {
    this.switch = !this.switch;
  }  
  onColor() {
    if(this.colorIndex == 3) {
      this.colorIndex = 0;
    } else {
      this.colorIndex ++;
    }
    this.messageEmitter.emit(this.colorIndex)

  }
}
