import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PjEmptyStatusConfig, PjProperty } from '../components.global';

@Component({
  selector: 'pj-empty-status',
  templateUrl: './pj-empty-status.component.html',
  styleUrls: ['./pj-empty-status.component.scss']
})
export class PjEmptyStatusComponent implements OnInit {

  @Input()
  config?: PjEmptyStatusConfig;

  constructor() { }

  ngOnInit(): void {
  }

  getCompStyle(): PjProperty {

    return {
      width: (this.config?.width || '144') + 'px',
      height: (this.config?.height || '144') + 'px',
      'border-width': (this.config?.borderWidth || '0') + 'px',
      'border-style': (this.config?.borderWidth ? 'dashed' : ''),
      'border-radius': (this.config?.radius || '0px'),
    };
  }

  getCompClass(): string {
    return this.config?.emptyType || 'typeMedia';
  }

  hasIcon(): boolean {
    return HasStringValue(this.config?.iconName);
  }

  getIconName(): string {
    return this.config?.iconName || '';
  }

  getIconSizeStyle(): PjProperty {
    return { 'font-size': (this.config?.iconSize || 40) + 'px' };
  }

  hasLabel(): boolean {
    return HasStringValue(this.config?.label);
  }

  getLabel(): string {
    return this.config?.label || '';
  }
}
