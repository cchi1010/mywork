import { Component, Input, OnInit } from '@angular/core';
import {
  HasStringValue,
  PJ_BTN_TYPE,
  PJ_COMPONENT_STYLE,
  PJ_SIZE,
} from 'src/component/components.global';
import { PjButtonComponent } from '../pj-button.component';
@Component({
  selector: 'pj-button-cta',
  templateUrl: './pj-button-cta.component.html',
  styleUrls: ['./pj-button-cta.component.scss'],
})
export class PjButtonCtaComponent extends PjButtonComponent implements OnInit {
  @Input()
  btnType: string = PJ_BTN_TYPE.FILLED;

  @Input()
  leftIconName?: string = '';

  @Input()
  rightIconName?: string = '';

  @Input()
  label = '';

  @Input()
  badgeLabel = '';

  @Input()
  pjSize?: string;

  @Input()
  pjColor?: string;

  @Input()
  focused = false;

  ngOnInit(): void { }

  getBtnClass(): string {
    let buttonType = this.btnType;
    if (this.leftIconName && this.badgeLabel) {
      buttonType += ' badgeiconClass';
    }
    else {
      if (this.badgeLabel) {
        buttonType += ' badgeClass';
      }
      if (this.leftIconName) {
        buttonType += ' leftIconClass';
      }
    }
    return (
      buttonType +
      (this.rightIconName ? ' rightIconClass' : '') +
      (this.disabled ? ' disabled' : '') +
      (this.focused ? ' focused' : '')
    );
  }

  hasLeftIcon(): boolean {
    return HasStringValue(this.leftIconName);
  }

  getLeftIconName(): string {
    return this.leftIconName || '';
  }

  hasRightIcon(): boolean {
    return HasStringValue(this.rightIconName);
  }

  getRightIconName(): string {
    return this.rightIconName || '';
  }

  hasLabel(): boolean {
    return HasStringValue(this.label);
  }
  getLabel(): string {
    return this.label;
  }

  hasBadge(): boolean {
    return HasStringValue(this.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.badgeLabel;
  }

  getBadgeColor(): string {
    switch (this.pjColor) {
      case PJ_COMPONENT_STYLE.SUCCESS:
        return this.btnType == PJ_BTN_TYPE.ELEVATED ||
          this.btnType == PJ_BTN_TYPE.FILLED
          ? PJ_COMPONENT_STYLE.WHITE
          : PJ_COMPONENT_STYLE.SUCCESS;
      case PJ_COMPONENT_STYLE.SECONDARY:
        return this.btnType == PJ_BTN_TYPE.ELEVATED ||
          this.btnType == PJ_BTN_TYPE.FILLED
          ? PJ_COMPONENT_STYLE.WHITE
          : PJ_COMPONENT_STYLE.SECONDARY;
      case PJ_COMPONENT_STYLE.BRAND:
        return this.btnType == PJ_BTN_TYPE.ELEVATED ||
          this.btnType == PJ_BTN_TYPE.FILLED
          ? PJ_COMPONENT_STYLE.WHITE
          : PJ_COMPONENT_STYLE.BRAND;
      case PJ_COMPONENT_STYLE.NEUTRAL:
        return this.btnType == PJ_BTN_TYPE.ELEVATED ||
          this.btnType == PJ_BTN_TYPE.FILLED
          ? PJ_COMPONENT_STYLE.WHITE
          : PJ_COMPONENT_STYLE.NEUTRAL;
      case PJ_COMPONENT_STYLE.WHITE:
        return this.btnType == PJ_BTN_TYPE.ELEVATED ||
          this.btnType == PJ_BTN_TYPE.FILLED
          ? PJ_COMPONENT_STYLE.NEUTRAL
          : PJ_COMPONENT_STYLE.WHITE;
      case PJ_COMPONENT_STYLE.ERROR:
        return this.pjColor;
      case PJ_COMPONENT_STYLE.BLACK:
        return PJ_COMPONENT_STYLE.WHITE;
    }
    return '';
  }

  getBadgeSize(): string {
    if (this.pjSize === PJ_SIZE.EXTRA_LARGE) {
      return PJ_SIZE.LARGE;
    }
    if (this.pjSize === PJ_SIZE.LARGE) {
      return PJ_SIZE.MEDIUM;
    }
    return PJ_SIZE.SMALL;
  }
}
