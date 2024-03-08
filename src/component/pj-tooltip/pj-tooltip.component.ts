import { Component, Input, OnInit } from '@angular/core';
import { PjProperty } from '../components.global';

@Component({
  selector: 'pj-tooltip',
  templateUrl: './pj-tooltip.component.html',
  styleUrls: ['./pj-tooltip.component.scss'],
})
export class PjTooltipComponent implements OnInit {
  @Input()
  content?: string;

  @Input()
  location: string = '';

  @Input()
  openedBy?: HTMLElement;

  constructor() {}

  ngOnInit(): void {}

  getContent(): string {
    return this.content || '';
  }

  private _locStyle?: PjProperty;
  setLocationStyle(locStyle: PjProperty): void {
    this._locStyle = locStyle;
  }
  getLocationStyle(): PjProperty {
    return this._locStyle || {};
  }
}
