import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjStepItemComponent } from './pj-step-item/pj-step-item.component';
import { PjStepComponent } from './pj-step.component';

@NgModule({
  declarations: [PjStepComponent, PjStepItemComponent],
  imports: [CommonModule, PjDirectiveModule],
  exports: [PjStepComponent, PjStepItemComponent],
})
export class PjStepModule {}
