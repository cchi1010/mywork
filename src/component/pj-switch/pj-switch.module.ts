import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSwitchComponent } from './pj-switch.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [
    PjSwitchComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjIconModule
  ],
  exports: [
    PjSwitchComponent
  ]
})
export class PjSwitchModule { }
