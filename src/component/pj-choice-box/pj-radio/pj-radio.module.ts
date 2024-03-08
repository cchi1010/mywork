import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjRadioComponent } from './pj-radio.component';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';



@NgModule({
  declarations: [
    PjRadioComponent
  ],
  imports: [
    CommonModule,

    PjIconModule
  ],
  exports: [
    PjRadioComponent
  ]
})
export class PjRadioModule { }
