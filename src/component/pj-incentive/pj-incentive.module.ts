import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjIncentiveComponent } from './pj-incentive.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjIncentiveComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule
  ],
  exports: [
    PjIncentiveComponent
  ]
})
export class PjIncentiveModule { }
