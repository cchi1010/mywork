import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PJ_SIZE } from 'src/component/components.global';
import { PjButtonComponent } from '../pj-button.component';

@Component({
  selector: 'pj-button-fab',
  templateUrl: './pj-button-fab.component.html',
  styleUrls: ['./pj-button-fab.component.scss'],
})
export class PjButtonFabComponent extends PjButtonComponent implements OnInit {
  @Input()
  iconName?: string;

  @Input()
  label?: string;

  @Input()
  focused = false;

  @Input()
  badgeLabel = '';

  @Input()
  pjSize?: string;

  ngOnInit(): void {}

  getBtnClass(): string {
    return (
      (this.hasLabel() ? 'extended' : 'simple') +
      (this.disabled ? ' disabled' : '') +
      (this.focused ? ' focused' : '')
    );
  }

  hasLabel(): boolean {
    return HasStringValue(this.label);
  }

  getLabel(): string {
    return this.label || '';
  }

  getIconName(): string {
    return this.iconName || '';
  }

  hasBadge(): boolean {
    if(this.disabled) {
      return false;
    }
    return HasStringValue(this.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.badgeLabel;
  }

  getBageSize(): string {
    return this.pjSize == PJ_SIZE.LARGE ? 'lg' : 'md';
  }
}
