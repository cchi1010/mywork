import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjProgressStepComponent } from './pj-progress-step.component';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjProgressStepItemComponent } from './pj-progress-step-item/pj-progress-step-item.component';

@NgModule({
  declarations: [PjProgressStepComponent, PjProgressStepItemComponent],
  imports: [CommonModule, PjIconModule],
  exports: [PjProgressStepComponent],
})
export class PjProgressStepModule {}
