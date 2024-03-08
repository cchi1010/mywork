import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjNewPasswordComponent } from './pj-new-password.component';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjProgressBarModule } from 'src/component/pj-progress/pj-progress-bar/pj-progress-bar.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjNewPasswordComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjIconModule,
    PjProgressBarModule
  ],
  exports: [
    PjNewPasswordComponent
  ]
})
export class PjNewPasswordModule { }
