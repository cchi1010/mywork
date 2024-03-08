import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjProgressBarComponent } from './pj-progress-bar.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjProgressBarComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule
  ],
  exports: [
    PjProgressBarComponent
  ]
})
export class PjProgressBarModule { }
