import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue } from 'src/component/components.global';
import { PjButtonComponent } from '../pj-button.component';

@Component({
  selector: 'pj-button-inline',
  templateUrl: './pj-button-inline.component.html',
  styleUrls: ['./pj-button-inline.component.scss'],
})
export class PjButtonInlineComponent extends PjButtonComponent implements OnInit {
  @Input()
  leftIconName?: string = '';

  @Input()
  rightIconName?: string = '';

  @Input()
  label = '';

  @Input()
  focused = false;

  ngOnInit(): void { }

  getBtnClass(): string {
    return (this.disabled ? ' disabled' : '') + (this.focused ? ' focused' : '');
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

  getLabel(): string {
    return this.label;
  }
}
