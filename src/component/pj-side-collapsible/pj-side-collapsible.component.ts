import { Component, Input, OnInit } from '@angular/core';
import { PJ_BTN_TYPE, PjCollapsibleSideData } from '../components.global';

@Component({
  selector: 'pj-side-collapsible',
  templateUrl: './pj-side-collapsible.component.html',
  styleUrls: ['./pj-side-collapsible.component.scss']
})
export class PjSideCollapsibleComponent implements OnInit {

  @Input()
  collapsibleSideData?: PjCollapsibleSideData;

  private _isFolded = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this._isFolded = (this.collapsibleSideData?.folded != null) ? this.collapsibleSideData?.folded : false;
  }

  onTitleBtnClick(): void {
    this._isFolded = !this._isFolded;
  }

  getConsendedIconName(): string {
    return this.collapsibleSideData?.consendedIconName || 'menu';
  }

  getCloseIconName(): string {
    return this.collapsibleSideData?.closeBtnName || 'close';
  }

  getCloseBtnType(): string {
    return this.collapsibleSideData?.closeBtnType || PJ_BTN_TYPE.FILLED;
  }
  getTitle(): string {
    return this.collapsibleSideData?.title || '';
  }

  getTypeClass(): string {
    return this._isFolded ? 'condensed' : 'full';
  }

  getWidthStyle(): {} {
    let width = -1;//
    if(this._isFolded) {
      width = this.collapsibleSideData?.foldedWith || -1;
    } else {
      width = this.collapsibleSideData?.width || -1;
    }
    if(width != -1) {
      return {'width': width + 'px'};
    }
    return {};
  }
}
