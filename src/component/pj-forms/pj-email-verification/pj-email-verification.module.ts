import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjEmailVerificationComponent } from './pj-email-verification.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjCodeboxModule } from 'src/component/pj-codebox/pj-codebox.module';
import { PjCountdownDirectiveModule } from 'src/directive/pj-countdown.directive';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTermNoticeModule } from '../../pj-term-notice/pj-term-notice.module';



@NgModule({
  declarations: [
    PjEmailVerificationComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjCodeboxModule,
    PjButtonModule,
    PjCountdownDirectiveModule,
    PjTermNoticeModule
  ],
  exports: [
    PjEmailVerificationComponent
  ]
})
export class PjEmailVerificationModule { }
