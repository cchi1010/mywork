import { HasStringValue } from 'src/component/components.global';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-progress-linear',
  templateUrl: './pj-progress-linear.component.html',
  styleUrls: ['./pj-progress-linear.component.scss'],
})
export class PjProgressLinearComponent implements OnInit {
  @Input()
  label: string = '';

  @Input()
  percent?: number;

  @Input()
  focused: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  hasLabel(): boolean {
    return HasStringValue(this.label);
  }

  getLabel(): string {
    return this.label;
  }

  hasPercent(): boolean {
    return (this.percent!=null)
  }
  getPercent(): string {
    return this.percent + '%';
  }

  getProgressClass(): string {
    return this.focused ? 'focused' : '';
  }

  getProgress(): number {
    return this.percent || 0;
  }

  isFocused(): boolean {
    return this.focused;
  }
  changeStatu(toFocuse: boolean, e: Event): void {
    if(toFocuse) {
      if(!this.focused) {
        this.focused = true;
        e.stopPropagation();
      }
    } else {
      if(this.focused) {
        this.focused = false;
        e.stopPropagation();
      }
    }
  }
}
