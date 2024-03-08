import { NgModule } from '@angular/core';
import { PjCheckboxGroupModule } from './pj-checkbox/pj-checkbox-group.module';
import { PjCheckboxModule } from './pj-checkbox/pj-checkbox.module';
import { PjRadioGroupModule } from './pj-radio/pj-radio-group.module';
import { PjRadioModule } from './pj-radio/pj-radio.module';

@NgModule({
  imports: [
      PjRadioModule,
      PjRadioGroupModule,
      PjCheckboxModule,
      PjCheckboxGroupModule
  ],
})
export class PjChoiceModule { }
