import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ArrayIsNotEmpty, isFalse, isTrue, PJ_SIZE, PjStepData, PjStepStatus } from '../components.global';

@Component({
  selector: 'pj-step',
  templateUrl: './pj-step.component.html',
  styleUrls: ['./pj-step.component.scss'],
})
export class PjStepComponent implements OnInit {
  @Input()
  pjSize: string = PJ_SIZE.LARGE;

  @Input()
  stepsData?: Array<PjStepData>;

  private _currentStepData?: PjStepData;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.stepsData != null) {
      this.stepsData.sort((i1, i2) => {
        return i1.index - i2.index;
      });
      for (let i = 0; i < this.stepsData.length; i++) {
        this.stepsData[i].index = i;
      }
    }
  }

  // 如果当前步骤没有valid，是不会去下一步的。
  nextStep(): PjStepData | undefined {
    if (this.stepsData == null) {
      return;
    }
    if (this._currentStepData == null) {
      this._currentStepData = this.stepsData[0];
    } else {
      this._moveToStep(this.stepsData.length - 1, false);
    }
    return this._currentStepData;
  }

  // 如果之前的tab都是没有问题的，则快速去index对应的tab，
  // 否则停留在第一个invalid的tab
  gotoStepDirectly(index: number): PjStepData | undefined {
    this._moveToStep(index as number, false);
    return this._currentStepData;
  }

  private _moveToStep(index: number, bypass: boolean): void {
    if (this.stepsData == null) {
      return;
    }
    if (this._currentStepData != null && isFalse(this._currentStepData.valid) && index >= this._currentStepData.index) {
      return;
    }
    let _curStep = this.stepsData?.filter(s => s.index == index);
    if (ArrayIsNotEmpty(_curStep)) {
      if (isTrue(_curStep![0].disabled)) {
        return;
      }
    }
    this.stepsData.forEach(step => step.stepStatus = PjStepStatus.PENDING);
    let endIndex: number = bypass ? index : this.stepsData.length - 1;
    for (let i = 0; i < endIndex + 1; i++) {
      const stepData = this.stepsData[i];
      if (stepData.index < index) {
        if (isFalse(stepData.valid) && isFalse(stepData.disabled)) {
          stepData.stepStatus = PjStepStatus.ONGOING;
          this._currentStepData = stepData;
          break;
        }
        stepData.stepStatus = PjStepStatus.COMPLETED;
      } else if (stepData.index == index){
        stepData.stepStatus = PjStepStatus.ONGOING;
        this._currentStepData = stepData;
      }
    }
    if (this._currentStepData != null) {
      this._currentStepData.stepStatus = PjStepStatus.ONGOING;
    }
  }
  onStepHeaderClick(index: number): void {
    let _curStep = this.stepsData?.filter(s => s.index == index);
    if (ArrayIsNotEmpty(_curStep)) {
      if (isTrue(_curStep![0].enableItemClick) && isFalse(_curStep![0].disabled)) {
        this._moveToStep(index, false);
      }
    }
  }

  getCurrentStepContent(): TemplateRef<any> | null {
    if (
      this._currentStepData == null &&
      this.stepsData != null &&
      this.stepsData.length > 0
    ) {
      this._moveToStep(this.stepsData.length - 1, true);
      if (this._currentStepData == null) {
        this._currentStepData = this.stepsData[0];
      }
    }
    return this._currentStepData?.templateRef || null;
  }

  getGapClass(): string {
    return (this.pjSize === PJ_SIZE.LARGE) ? 'gap-4' : 'gap-2';
  }
}
