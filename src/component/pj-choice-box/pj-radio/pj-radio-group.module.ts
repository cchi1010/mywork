import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PjRadioGroupComponent } from './pj-radio-group.component';
import { PjRadioModule } from '../pj-radio/pj-radio.module';
import { PjCheckboxModule } from '../pj-checkbox/pj-checkbox.module';

@NgModule({
  declarations: [
    PjRadioGroupComponent
  ],
  imports: [
    CommonModule,
    PjRadioModule,
    PjCheckboxModule
  ],
  exports: [
    PjRadioGroupComponent
  ]
})
export class PjRadioGroupModule { }

