import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjModelTextValueComponent } from './pj-model-text-value.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';



@NgModule({
  declarations: [
    PjModelTextValueComponent
  ],
  imports: [
    CommonModule,

    PjIconModule
  ],
  exports: [
    PjModelTextValueComponent
  ]
})
export class PjModelTextValueModule { }
