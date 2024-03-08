import { Component, Input, OnInit } from '@angular/core';
import { PjProgressStepData } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-step',
  templateUrl: './pj-progress-step.component.html',
  styleUrls: ['./pj-progress-step.component.scss']
})
export class PjProgressStepComponent implements OnInit {

  private _currentStepElm?: HTMLDivElement;

  @Input()
  steps?: Array<PjProgressStepData>;

  constructor() { }
  ngOnInit(): void {
  }

  getIconCurrentClass(step: PjProgressStepData): string {
    if (step.status == 'current' || step.status == 'done') {
      return 'current';
    }
    return '';
  }

  getLineCurrentClass(step: PjProgressStepData, index: number): string {
    let lineClass = '';
    if (step.status == 'done') {
      lineClass = 'current';
    }
    if (this.steps != null) {
      if (index >= (this.steps.length - 1)) {
        lineClass = lineClass + ' invisible';
      }
    }
    return lineClass;
  }

  getLabelCurrentClass(step: PjProgressStepData, elm?: HTMLDivElement): string {
    if (step.status == 'current') {
      if (elm != null && this._currentStepElm != elm) {
        this._currentStepElm = elm;
      }
      return 'current';
    }
    return '';
  }

  getIconName(step: PjProgressStepData): string {
    if (step.status == 'done') {
      return 'check_circle';
    }
    if (step.status == 'current') {
      return 'radio_button_checked';
    }
    return 'radio_button_unchecked';
  }

  isLastStep(index: number): boolean {
    if (this.steps == null) {
      return false;
    }
    return index < (this.steps.length - 1);
  }

  private curStep?: PjProgressStepData;
  hasColoeredDescription(): boolean {
    this._setCurrentStep();
    return (this.curStep?.labelColor != null && this.curStep.labelColor.length > 0);
  }

  getDescritionClass(): string {
    this._setCurrentStep();
    return this.curStep?.labelColor || '';
  }

  getDescrition(): string {
    this._setCurrentStep();
    return this.curStep?.description || '';
  }

  private _setCurrentStep(): void {
    if (this.curStep != null || this.steps == null || this.steps.length == 0) {
      return;
    }
    this.steps.forEach(step => {
      if (step.status == 'current') {
        this.curStep = step;
      }
    });
  }
}
