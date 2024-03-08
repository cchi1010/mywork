import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjProgressCircleComponent } from './pj-progress-circle.component';

@NgModule({
  declarations: [
    PjProgressCircleComponent,
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjImageModule,
  ],
  exports: [
    PjProgressCircleComponent,
  ]
})
export class PjProgressCircleModule { }
