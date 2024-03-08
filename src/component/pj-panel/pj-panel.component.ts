import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PjProperty } from '../components.global';

@Component({
  selector: 'pj-panel',
  templateUrl: './pj-panel.component.html',
  styleUrls: ['./pj-panel.component.scss'],
})
export class PjPanelComponent implements OnInit {
  @Input()
  shadowSn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  @Input()
  radius: number = 8;

  @Input()
  padding: number = 16;

  @Input()
  title?: string;

  @Input()
  titleStyle?: string; // format: body-1.primary.800 TODO: 支持类似的style表述

  @Input()
  minWidth?: string;

  @Input()
  maxWidth?: string;

  private _panelStyle: PjProperty = {};

  constructor() {}

  ngOnInit(): void {
    if (HasStringValue(this.minWidth)) {
      this._panelStyle['min-width'] = this.minWidth || '';
    }
    if (HasStringValue(this.maxWidth)) {
      this._panelStyle['max-width'] = this.maxWidth || '';
    }
    this._panelStyle['border-radius'] = this.radius + 'px';
    this._panelStyle['padding'] = this.padding + 'px';
  }

  getPanelClass(): string {
    return this.shadowSn > 0 ? 'shadow' + this.shadowSn : '';
  }

  getPanelStyle(): {} {
    return this._panelStyle;
  }

  hasTitle(): boolean {
    return HasStringValue(this.title);
  }

  getTitle(): string {
    return this.title || '';
  }
}
