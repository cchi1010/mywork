import { PjTooltipDirective } from './pj-tooltip.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjTooltipComponent } from './pj-tooltip.component';



@NgModule({
  declarations: [
    PjTooltipComponent,
    PjTooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PjTooltipComponent,
    PjTooltipDirective
  ]
})
export class PjTooltipModule { }
