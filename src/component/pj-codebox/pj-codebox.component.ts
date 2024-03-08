import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { HasStringValue } from '../components.global';

@Component({
  selector: 'pj-codebox',
  templateUrl: './pj-codebox.component.html',
  styleUrls: ['./pj-codebox.component.scss'],
})
export class PjCodeboxComponent implements OnInit {

  @ViewChild('inputElm1')
  inputElm1?: ElementRef<any>;

  @ViewChild('inputElm2')
  inputElm2?: ElementRef<any>;

  @ViewChild('inputElm3')
  inputElm3?: ElementRef<any>;

  @ViewChild('inputElm4')
  inputElm4?: ElementRef<any>;

  @ViewChild('inputElm5')
  inputElm5?: ElementRef<any>;

  @ViewChild('inputElm6')
  inputElm6?: ElementRef<any>;

  private _inputElmList = new Array<HTMLInputElement>(6)

  total = 6;

  @Input()
  hasError = false;

  @Input()
  values?: string;

  @Output()
  valueChanged = new EventEmitter<string>();

  charValues: string[] = new Array<string>();

  constructor() { }

  ngOnInit(): void {
    this.charValues = new Array<string>(this.total);
    for (let i = 0; i < this.total; i++) {
      this.charValues[i] = (this.values?.charAt(i) || '') as string;
    }
  }

  ngAfterViewInit(): void {
    if (this.inputElm1 != null) {
      this._inputElmList[0] = this.inputElm1.nativeElement;
    }
    if (this.inputElm2 != null) {
      this._inputElmList[1] = this.inputElm2.nativeElement;
    }
    if (this.inputElm3 != null) {
      this._inputElmList[2] = this.inputElm3.nativeElement;
    }
    if (this.inputElm4 != null) {
      this._inputElmList[3] = this.inputElm4.nativeElement;
    }
    if (this.inputElm5 != null) {
      this._inputElmList[4] = this.inputElm5.nativeElement;
    }
    if (this.inputElm6 != null) {
      this._inputElmList[5] = this.inputElm6.nativeElement;
    }
  }
  getClass(item: string): string {
    if (this.hasError) {
      return 'error';
    }
    if (item.trim().length > 0) {
      return 'filled';
    }
    return '';
  }

  onFocused(elm: HTMLInputElement): void {
    this.hasError = false;
    elm.selectionStart = 0;
    elm.selectionEnd = 1;
  }

  onKeypress(elm: HTMLInputElement, event: any, whichElm: number): void {
    event.preventDefault();
    if (this.charValues == null || event.key.length > 1) {
      if (event.keyCode == 8) {
        if (HasStringValue(this.charValues[whichElm])) {
          this.charValues[whichElm] = '';
        } else {
          this._keyHandler(event.keyCode, whichElm, this._inputElmList);
        }
      } else {
        this._keyHandler(event.keyCode, whichElm, this._inputElmList);
      }
    } else {
      if (event.keyCode == 32) {  // space bar
        this.hasError = true;
      } 
      if (event.keyCode > 33 && event.keyCode < 127 ) {
        elm.value = event.key;
        this.charValues[whichElm] = event.key;
        let s = this.charValues.join('');
        this.valueChanged.emit(s);
        this._keyHandler(13, whichElm, this._inputElmList);
      }
    }
    
  }

  // 为后面处理按键做准备
  // keyCode：按键值
  // curElmIndex： 当前正在输入的element编号
  // elmList： 输入组element
  private _keyHandler(keyCode: number, curElmIndex: number, elmList: HTMLInputElement[]): void {
    const elmListLen = elmList.length;
    if (keyCode == 39 || keyCode == 13) { // 39：左移键，13：回车键
      if (curElmIndex < (elmListLen - 1)) {
        this._inputElmList[curElmIndex + 1].focus();
      }
    } else if (keyCode == 37 || keyCode == 8) { // 37：右移键，8：Backspace键
      if (curElmIndex > 0) {
        this._inputElmList[curElmIndex - 1].focus();
      }
    }
  }
}
