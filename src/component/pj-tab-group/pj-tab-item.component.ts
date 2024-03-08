import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PJ_SIZE, PjTabItemData } from 'src/component/components.global';
import { PJ_COMPONENT_STYLE } from 'src/component/components.global';

@Component({
  selector: 'pj-tab-item',
  template: ``,
})
export class PjTabItemComponent implements OnInit {

  @Input()
  pjSize: string = PJ_SIZE.LARGE;

  @Input()
  item?: PjTabItemData;

  constructor() { }

  ngOnInit(): void {
  }

  getBadgeSize(): string {
    return this.pjSize == PJ_SIZE.MEDIUM ? PJ_SIZE.SMALL : PJ_SIZE.MEDIUM;
  }
  hasIcon(): boolean {
    return HasStringValue(this.item?.iconName);
  }

  getIconName(): string {
    return this.item?.iconName || '';
  }

  hasBadge(): boolean {
    return HasStringValue(this.item?.badge);
  }

  private _hoverBadgeColor = '';
  onMouseOverElm(): void {
    if (!HasStringValue(this._hoverBadgeColor)) {
      this._hoverBadgeColor = 'white';
    }
  }

  onMouseLeaveElm(): void {
    if (HasStringValue(this._hoverBadgeColor)) {
      this._hoverBadgeColor = '';
    }
  }
  getBadgeLabel(): string {
    return this.item?.badge || '';
  }

  getBadgeColor(): string {
    if (HasStringValue(this._hoverBadgeColor)) {
      return this._hoverBadgeColor;
    }
    return this.item?.isActived ? PJ_COMPONENT_STYLE.SECONDARY : PJ_COMPONENT_STYLE.NEUTRAL;
  }

  getFocusedClass(): string {
    let tabClass = '';
    if (this.item?.badge && this.item?.iconName) {
      tabClass += 'badgeiconClass';
    }
    else {
      if (this.item?.badge) {
        tabClass += ' badgeClass';
      }
      if (this.item?.iconName) {
        tabClass += ' iconClass';
      }
    }
    if (this.item?.isActived) {
      tabClass += ' focused';
    }
    return tabClass;
  }

  isActiveItem(): boolean {
    return this.item?.isActived || false;
  }
  getTabTitle(): string {
    return this.item?.title || '';
  }
}
