import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneNumberForm]'
})
export class PhoneNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');

    if(value.length >= 10) {
      input.value = `(${value.slice(0, 3)})${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else {
      input.value = value;
    }
  }


}

