import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjChangePasswordComponent } from './pj-change-password.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjNewPasswordModule } from '../pj-new-password/pj-new-password.module';



@NgModule({
  declarations: [
    PjChangePasswordComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule,
    PjNewPasswordModule
  ],
  exports: [
    PjChangePasswordComponent
  ]
})
export class PjChangePasswordModule { }
