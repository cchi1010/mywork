import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjProgressIndicatorComponent } from './pj-progress-indicator.component';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjProgressIndicatorComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjImageModule,
  ],
  exports: [
    PjProgressIndicatorComponent
  ]
})
export class PjProgressIndicatorModule { }
