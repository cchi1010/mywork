import { Component, Input, OnInit } from '@angular/core';
import {
  HasStringValue,
  PJ_BTN_TYPE,
  PJ_COMPONENT_STYLE,
  PJ_SIZE,
} from 'src/component/components.global';
import { PjButtonComponent } from '../pj-button.component';

@Component({
  selector: 'pj-button-icon',
  templateUrl: './pj-button-icon.component.html',
  styleUrls: ['./pj-button-icon.component.scss'],
})
export class PjButtonIconComponent extends PjButtonComponent implements OnInit {
  @Input()
  btnType: string = PJ_BTN_TYPE.FILLED;

  @Input()
  iconName?: string;

  @Input()
  focused = false;

  @Input()
  badgeLabel = '';

  @Input()
  inlineBadge = false;

  @Input()
  pjColor?: string;

  @Input()
  pjSize?: string;

  ngOnInit(): void { }

  getBtnClass(): string {
    let iconClass = ' iconOnly';
    if (this.badgeLabel.length > 0 && this.inlineBadge) {
      iconClass = ' withBadge';
    }
    return (
      this.btnType +
      iconClass +
      (this.disabled ? ' disabled' : '') +
      (this.focused ? ' focused' : '')
    );
  }

  getIconName(): string {
    return this.iconName || '';
  }

  hasBadge(): boolean {
    return HasStringValue(this.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.badgeLabel;
  }

  getBadgeColor(): string {
    let badgeColor = this.pjColor || PJ_COMPONENT_STYLE.NEUTRAL;
    if (
      this.pjColor == PJ_COMPONENT_STYLE.NEUTRAL &&
      (this.btnType == PJ_BTN_TYPE.FILLED ||
        this.btnType == PJ_BTN_TYPE.ELEVATED)
    ) {
      badgeColor = PJ_COMPONENT_STYLE.WHITE;
    }
    return badgeColor;
  }

  getBadgeClass(): string {
    if (this.badgeLabel.length > 0 && !this.inlineBadge) {
      return 'badge';
    }
    return '';
  }
  getBadgeSize(): string {
    switch(this.pjSize) {
      case PJ_SIZE.SMALL: return PJ_SIZE.SMALL;
      case PJ_SIZE.MEDIUM: return PJ_SIZE.MEDIUM;
      case PJ_SIZE.LARGE: return PJ_SIZE.MEDIUM;
      case PJ_SIZE.EXTRA_LARGE: return PJ_SIZE.LARGE;
    }
    return PJ_SIZE.SMALL;
  }
}
