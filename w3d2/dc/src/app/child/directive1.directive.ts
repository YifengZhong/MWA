import { Directive, ElementRef, Renderer, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[upper]'
})
export class MyDirective1Directive {

  constructor(private e: ElementRef, private r: Renderer) { 
      // e.nativeElement.style.fontSize = '22px'
      r.setElementStyle(e.nativeElement, 'font-size', '22px')
  }
 
  @HostBinding('style.text-transform') myUPPER;
  ngOnInit(){ // reached after all bound properties are initilized
    this.myUPPER = 'uppercase';
    
  }



  
}
