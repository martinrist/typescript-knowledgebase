import { CopyrightDirective } from './copyright.directive';
import {ElementRef} from "@angular/core";

describe('CopyrightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {nativeElement: document.createElement('div')};
    const directive = new CopyrightDirective(mockElementRef as ElementRef);
    expect(directive).toBeTruthy();
  });
});
