import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBorderify]'
})
export class BorderifyDirective {

  @Input() set setBordersWidth (value: string) {
    if (!!value) {
      this.elementRef.nativeElement.style.borderWidth = value;
    }
  }

  @Input() set setBorderColor (value: string) {
    if (!!value) {
      this.elementRef.nativeElement.style.borderColor = value;
    }
  }

  constructor(
    public elementRef: ElementRef
  ) {
    this.elementRef.nativeElement.classList.add('my-border');
  }

}
