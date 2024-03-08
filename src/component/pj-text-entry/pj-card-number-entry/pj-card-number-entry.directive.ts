import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cardNumberForm]'
})
export class CardNumberEntryDirective {
  constructor(private _textEntryElm?: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this._textEntryElm?.nativeElement.querySelector('input[type="text"]');
    const value = input.value.replace(/\D/g, '');

    if(value.length >= 13) {  // card number >= 13
      input.value = `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8, 12)} ${value.slice(12, 16)}`;
    } else {
      input.value = value;
    }
  }
}

