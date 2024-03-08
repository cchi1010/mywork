import { Component, Input, OnInit } from '@angular/core';
import { PJ_COMPONENT_STYLE, PJ_SIZE, PjImageData, PjImageTypeConst } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-circle',
  templateUrl: './pj-progress-circle.component.html',
  styleUrls: ['./pj-progress-circle.component.scss']
})
export class PjProgressCircleComponent implements OnInit {

  @Input()
  percentage: number = 0;

  @Input()
  pjSize: string = PJ_SIZE.SMALL;

  @Input()
  pjColor: string = PJ_COMPONENT_STYLE.NEUTRAL;
  @Input()
  isNA?: boolean;
  constructor() { }

  ngOnInit(): void {

  }

  getPercentage(): number {
    return this.percentage;
  }
  getStyle(): string {
    // return this.pjSize;
    return this.pjSize + ' ' + this.pjColor;
  }

  isNone(): boolean {
    return this.isNA||false;
  }
}
