import { Component, Input, OnInit } from '@angular/core';
import { isTrue, PJ_SIZE, PjStepData, PjStepStatus } from 'src/component/components.global';

@Component({
  selector: 'pj-step-item',
  templateUrl: './pj-step-item.component.html',
  styleUrls: ['./pj-step-item.component.scss']
})
export class PjStepItemComponent implements OnInit {

  @Input()
  pjSize: string = PJ_SIZE.LARGE;

  @Input()
  stepSerial: number = 1;

  @Input()
  stepData?: PjStepData;

  constructor() { }

  ngOnInit(): void {
  }

  getStepItemClass(): string {
    let stepItemClass = this.pjSize;
    if (this.stepData != null) {
      if (this.stepData.stepStatus == PjStepStatus.ONGOING) {
        stepItemClass = stepItemClass + ' ongoing';
      } else if (this.stepData.stepStatus == PjStepStatus.PENDING) {
        stepItemClass = stepItemClass + ' pending';
      } else {
        stepItemClass = stepItemClass + ' completed';
        if(isTrue(this.stepData.disabled)) {
          stepItemClass = stepItemClass + ' completed disabled';
        }
      }
    }
    return stepItemClass;
  }

  hasStepSerialLabel(): boolean {
    return this.pjSize == PJ_SIZE.LARGE;
  }
  getTitle(): string {
    return (this.stepData?.title || '');
  }
}
