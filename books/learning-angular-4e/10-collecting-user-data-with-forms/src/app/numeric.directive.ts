import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {

  // Binds the `currentClass` property to the `class` property of the input element
  @HostBinding('class') currentClass = '';

  // Binds this method to the `keypress` event on the current element
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.currentClass = 'invalid';
      event.preventDefault();
    } else {
      this.currentClass = 'valid';
    }
  }

  constructor() { }

}
