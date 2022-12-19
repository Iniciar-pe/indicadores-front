import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTag]'
})
export class TagDirective {
  @Input('appTag') id: number;

  constructor(public el: ElementRef) { }

}