import { Directive, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[pjDisabled]'
})
export class PjDisableDirective implements OnInit {

    constructor(private _elm: ElementRef) { }

    ngOnInit(): void {
      this._elm.nativeElement.classList.add('disabled');
      this._elm.nativeElement.setAttribute('style', 'pointer-events: none;');
      if(this._elm.nativeElement.children[0]!=null) {
        this._elm.nativeElement.children[0].classList.add('disabled');
      }
    }

}
