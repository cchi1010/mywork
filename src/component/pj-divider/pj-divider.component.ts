import { Component, Input, OnInit } from '@angular/core';
import { DIRECTION, PjDividerType, PjProperty } from '../components.global';

@Component({
  selector: 'pj-divider',
  templateUrl: './pj-divider.component.html',
  styleUrls: ['./pj-divider.component.scss'],
})
export class PjDividerComponent implements OnInit {
  @Input()
  width: number = 1;
  @Input()
  label = '';

  @Input()
  direction = DIRECTION.H;

  @Input()
  dividerType: PjDividerType = 'strong';

  private _dividerClass: string = '';
  private _dividerStyle: PjProperty = {};
  private _directionClass: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.direction == DIRECTION.H) {
      this._directionClass = 'flex-row';
      this._dividerClass = this.dividerType + ' ' + DIRECTION.H;
      this._dividerStyle = { 'border-bottom-width': this.width + 'px' };
      // if (this.length > 0) {
      //   this._dividerLengthStyle = { width: this.length + 'px' };
      // } else {
      //   this._dividerLengthStyle = { width: '100%' };
      // }
    } else {
      this._directionClass = 'flex-col vertical';
      this._dividerClass = this.dividerType + ' ' + DIRECTION.V;
      this._dividerStyle = { 'border-left-width': this.width + 'px' };
      // if (this.length > 0) {
      //   this._dividerLengthStyle = { height: this.length + 'px' };
      // } else {
      //   this._dividerLengthStyle = { height: '100%' };
      // }
    }
  }

  getDividerStyle(): PjProperty {
    return this._dividerStyle;
  }
  getDividerClass(): string {
    return this._dividerClass;
  }
  hasLabel(): boolean {
    return this.label != null && this.label.length > 0;
  }

  getDirectionClass(): string {
    return this._directionClass;
  }
}
