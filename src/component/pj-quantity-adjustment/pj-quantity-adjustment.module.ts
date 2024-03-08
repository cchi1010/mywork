import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjQuantityAdjustmentComponent } from './pj-quantity-adjustment.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';



@NgModule({
  declarations: [
    PjQuantityAdjustmentComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjIconModule
  ],
  exports: [
    PjQuantityAdjustmentComponent
  ]
})
export class PjQuantityAdjustmentModule { }
