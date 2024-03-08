import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PJ_BTN_TYPE, PJ_SIZE, PjArrowGroupData } from '../components.global';

@Component({
  selector: 'pj-arrow-group',
  templateUrl: './pj-arrow-group.component.html',
  styleUrls: ['./pj-arrow-group.component.scss'],
})
export class PjArrowGroupComponent implements OnInit {
  @Input()
  arrowGroupData?: PjArrowGroupData;

  @Output()
  forward = new EventEmitter<void>();

  @Output()
  backward = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  getBtnType(): string {
    return this.arrowGroupData?.btnType || PJ_BTN_TYPE.TEXT;
  }

  getBtnSize(): string {
    return this.arrowGroupData?.btnSize || PJ_SIZE.LARGE;
  }

  onLeftBtnClick(): void {
    this.forward.emit();
  }

  onRightBtnClick(): void {
    this.backward.emit();
  }

  getSpaceStyle(): {} {
    if (this.arrowGroupData?.btnType == PJ_BTN_TYPE.TEXT) {
      return { 'margin-right': '4px' };
    }
    return { 'margin-right': '8px' };
  }

  isForwardDisabled(): boolean {
   // console.log(this.arrowGroupData?.forwardDisabled);
    return this.arrowGroupData?.forwardDisabled || false;
  }
  isBackwardDisabled(): boolean {
    return this.arrowGroupData?.backwardDisabled || false;
  }
}
