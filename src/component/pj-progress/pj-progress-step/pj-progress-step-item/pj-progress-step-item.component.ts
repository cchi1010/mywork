import { Component, Input, OnInit } from '@angular/core';
import { PjProgressStepData } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-step-item',
  templateUrl: './pj-progress-step-item.component.html',
  styleUrls: ['./pj-progress-step-item.component.scss']
})
export class PjProgressStepItemComponent implements OnInit {

  @Input()
  stepItem?: PjProgressStepData;

  constructor() { }

  ngOnInit(): void {
  }

  getIconClass(): string {
    if (this.stepItem?.status == 'current' || this.stepItem?.status == 'done') {
      return 'current';
    }
    return '';
  }

  getLineClass(): string {
    let lineClass = '';
    if (this.stepItem?.status == 'done') {
      lineClass = 'current';
    }
    if (this.stepItem?.lastStep) {
      lineClass = lineClass + ' invisible';
    }
    return lineClass;
  }

  getTextClass(): string {
    if (this.stepItem?.status == 'current') {
      return 'current';
    }
    if (this.stepItem?.status == 'coming') {
      return 'pending';
    }
    return '';
  }

  getIconName(): string {
    if (this.stepItem?.status == 'done') {
      return 'check_circle';
    }
    if (this.stepItem?.status == 'current') {
      return 'radio_button_checked';
    }
    return 'radio_button_unchecked';
  }

  getLabel(): string {
    return this.stepItem?.label || '';
  }

  getDescription(): string {
    return this.stepItem?.description || '';
  }

}
