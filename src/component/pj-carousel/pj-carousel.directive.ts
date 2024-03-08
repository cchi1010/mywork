import { Directive, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[swiperItem]',
})
export class PjSwiperItemDirective implements OnInit {
  constructor(private _elm: TemplateRef<any>) {}

  ngOnInit(): void {}

  getEelement(): TemplateRef<any> {
    return this._elm;
  }
}
