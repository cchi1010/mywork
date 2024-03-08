import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjResetPasswordComponent } from './pj-reset-password.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjPanelModule } from 'src/component/pj-panel/pj-panel.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjNewPasswordModule } from '../pj-new-password/pj-new-password.module';



@NgModule({
  declarations: [
    PjResetPasswordComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjButtonModule,
    PjPanelModule,

    PjNewPasswordModule
  ],
  exports: [
    PjResetPasswordComponent
  ]
})
export class PjResetPasswordModule { }
