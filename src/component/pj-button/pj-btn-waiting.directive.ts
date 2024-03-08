import { Directive, HostListener, Input, ViewContainerRef } from "@angular/core";
import { Observable, timer } from "rxjs";
import { PjSpinnerComponent } from "../pj-spinner/pj-spinner.component";


// 指定某按钮有如下行为：
// 单击后变成disable状态，
// 外部通知之后变成enable状态
// 在disable状态时，显示的是spin
@Directive({
  selector: '[PjBtnWaitable]',
})
export class PjBtnWaitingDirective {

  @Input()
  done: boolean = false;

  @Input()
  doneObersable?: Observable<any>;

  constructor(private _hostElm: ViewContainerRef) { }

  @HostListener('click')
  onClick(): void {
    let isDisabled = this._hostElm.element.nativeElement.children[0].classList.contains('disabled');
    if (isDisabled) {
      return;
    }
    let compRef = this._hostElm.createComponent(PjSpinnerComponent);
    this._hostElm.element.nativeElement.children[0].classList.add('disabled');
    let hostHeight = this._hostElm.element.nativeElement.offsetHeight;
    let hostWidth = this._hostElm.element.nativeElement.offsetWidth;
    let hostLeft = this._hostElm.element.nativeElement.offsetLeft;
    let hostTop = this._hostElm.element.nativeElement.offsetTop;
    timer(10).subscribe(()=>{
      let elmHeight = compRef.location.nativeElement.children[0].offsetHeight;
      let elmWidth = compRef.location.nativeElement.children[0].offsetWidth;
      compRef.location.nativeElement.setAttribute('style', 'position: absolute; top: ' + (hostTop + (hostHeight - elmHeight) / 2) + 'px; left: ' + (hostLeft + (hostWidth - elmWidth) / 2) + 'px;');
    });
    // this._hostElm.nativeElement.classList.add('spin');
  }
}