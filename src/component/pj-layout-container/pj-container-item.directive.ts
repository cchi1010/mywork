import { Directive, ElementRef } from '@angular/core';

// 添加该指令的组件根据布局组件的大小配置使用哪种break-point下的style
@Directive({
  selector: '[PjContainerItem]',
})
export class PjContainerItemDirective {
  private _size: string = '';

  constructor(private _elm: ElementRef) { }

  setElementSize(size: string): void {
    if (this._size == size || size.length <= 0) {
      return;
    }
    let nativeElm = this._elm.nativeElement?.children[0];
    if (nativeElm == null) {
      return;
    }
    this._size = size;
    if (this._size?.length > 0) {
      if (this._isAngularComponent(this._elm)) {
        nativeElm = this._elm.nativeElement.children[0];
      } else {
        nativeElm = this._elm.nativeElement;
      }
      nativeElm.classList.remove('xs', 'md', 'sm', 'lg', 'xl', 'xxl');
    }
    switch (this._size) {
      case 'xs':
        // this._elm.nativeElement.children[0].classList.add('xs');
        nativeElm.classList.add('xs');
        break;
      case 'sm':
        //this._elm.nativeElement.children[0].classList.add('xs', 'sm');
        nativeElm.classList.add('xs', 'sm');
        break;
      case 'md':
        // this._elm.nativeElement.children[0].classList.add('xs', 'sm', 'md');
        nativeElm.classList.add('xs', 'sm', 'md');
        break;
      case 'lg':
        // this._elm.nativeElement.children[0].classList.add('xs', 'sm', 'md', 'lg');
        nativeElm.classList.add('xs', 'sm', 'md', 'lg');
        break;
      case 'xl':
        // this._elm.nativeElement.children[0].classList.add('xs', 'sm', 'md', 'lg', 'xl');
        nativeElm.classList.add('xs', 'sm', 'md', 'lg', 'xl');
        break;
      case 'xxl':
        // this._elm.nativeElement.children[0].classList.add('xs', 'sm', 'md', 'lg', 'xl');
        nativeElm.classList.add('xs', 'sm', 'md', 'lg', 'xl', 'xxl');
        break;
    }
  }

  private _isAngularComponent(elm: ElementRef): boolean {
    let tag = elm.nativeElement.tagName as string;
    if (tag.startsWith('PJ-')) {
      return true;
    }
    if (tag.startsWith('AM-')) {
      return true;
    }
    return false;
  }
}
