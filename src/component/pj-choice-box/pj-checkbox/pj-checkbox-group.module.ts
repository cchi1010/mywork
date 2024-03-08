
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjCheckboxGroupComponent } from './pj-checkbox-group.component';
import { PjCheckboxModule } from '../pj-checkbox/pj-checkbox.module';
import { PjRadioModule } from '../pj-radio/pj-radio.module';

@NgModule({
  declarations: [PjCheckboxGroupComponent],
  imports: [
    CommonModule, 
    
    PjCheckboxModule,
    PjRadioModule
  ],
  exports: [PjCheckboxGroupComponent],
})
export class PjCheckboxGroupModule {}
