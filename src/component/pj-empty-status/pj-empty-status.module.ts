import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjEmptyStatusComponent } from './pj-empty-status.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjEmptyStatusComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjIconModule,
  ],
  exports: [
    PjEmptyStatusComponent
  ]
})
export class PjEmptyStatusModule { }
