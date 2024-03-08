import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSpinnerComponent } from './pj-spinner.component';



@NgModule({
  declarations: [
    PjSpinnerComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule
  ],
  exports: [
    PjSpinnerComponent
  ]
})
export class PjSpinnerModule { }
