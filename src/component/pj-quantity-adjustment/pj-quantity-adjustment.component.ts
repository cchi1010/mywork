import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { PjProperty, PJ_SIZE } from 'src/component/components.global';

@Component({
  selector: 'pj-quantity-adjustment',
  templateUrl: './pj-quantity-adjustment.component.html',
  styleUrls: ['./pj-quantity-adjustment.component.scss'],
})
export class PjQuantityAdjustmentComponent implements OnInit {
  @Input()
  maximum = 5; // 根据允许的最大值，确定允许输入几位数字，确定输入框的大小

  @Input()
  pjSize: string = PJ_SIZE.SMALL;

  maxLen: number = 1;

  @Input()
  qtyValue: number = 1;

  @Output()
  qtyChange = new EventEmitter<number>();

  private _leftIconName: string = 'delete';

  private _focused: boolean = false;

  private _widthStyle: PjProperty = {};

  constructor() { }

  getIconName(): string {
    if (this.qtyValue > 1) {
      this._leftIconName = 'remove_circle';
    } else {
      this._leftIconName = 'delete';
    }
    return this._leftIconName;
  }
  ngOnInit(): void {
    this.maxLen = this.maximum.toString().length;
    this._widthStyle = {'width': 10*this.maxLen + 'px'};
  }

  onLeftIconClick(event: Event): void {
    event.stopPropagation();
    if (this.qtyValue > 1) {
      this.qtyValue--;
      this._inputValue = this.qtyValue;
      this.qtyChange.emit(this.qtyValue);
    }
  }

  getLeftIconDisabledClass(): string {
    return (this.qtyValue > 1) ? '' : 'disabled';
  }

  onRightIconClick(event: Event): void {
    event.stopPropagation();
    if (this.qtyValue < this.maximum) {
      this.qtyValue++;
      this._inputValue = this.qtyValue;
      this.qtyChange.emit(this.qtyValue);
    }
  }

  getRightIconDisabledClass(): string {
    return (this.qtyValue >= this.maximum) ? 'disabled' : '';
  }

  private _inputValue: number = 1;
  onValueChanged(elm: HTMLInputElement): void {
    let a = Number.parseInt(elm.value || '1');
    if (!Number.isInteger(a)) {
      a = 1;
    }
    if (a > this.maximum) {
      a = this.maximum;
    }
    this.qtyValue = a;
    this._inputValue = this.qtyValue
    this.qtyChange.emit(this.qtyValue);
  }

  onInputElmFocused(elm: HTMLInputElement): void {
    this._focused = true;
    elm.select();
  }

  getFocusedClass(): string {
    return this._focused ? 'focused' : '';
  }

  onFocusOut(): void {
    if (this._inputValue != this.qtyValue) {
      if (this._inputValue > this.maximum) {
        this.qtyValue = 0;
        timer(100).subscribe(() => this.qtyValue = this.maximum);
      } else if (this._inputValue < 1) {
        this.qtyValue = 0;
        timer(100).subscribe(() => this.qtyValue = 1);
      } else {
        this.qtyValue = this._inputValue;
      }
    }
    this._focused = false;
  }
  getQty(): string {
    return this.qtyValue == 0 ? '' : ('' + this.qtyValue);
  }

  setQtyValue():void{
    const x = document.getElementById("qty") as HTMLInputElement;
    x.value=this.qtyValue == 0 ? '1' : ('' + this.qtyValue);
  }

  getIconStyle(): PjProperty {
    if (this.pjSize == PJ_SIZE.LARGE) {
      return { 'font-size': '22px' };
    } else if (this.pjSize == PJ_SIZE.EXTRA_LARGE) {
      return { 'font-size': '24px' };
    }
    return { 'font-size': '20px' };
  }

  getWidthStyle(): PjProperty {
    return this._widthStyle;
  }
}
