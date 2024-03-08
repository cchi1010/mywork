import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjTermNoticeModule } from 'src/component/pj-term-notice/pj-term-notice.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjCaptchaDirectiveModule } from 'src/directive/pj-recaptcha.directive';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjSigninComponent } from './pj-signin.component';



@NgModule({
  declarations: [
    PjSigninComponent
  ],
  imports: [
    CommonModule,

    PjCaptchaDirectiveModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjDividerModule,
    PjButtonModule,
    PjTermNoticeModule
  ],
  exports: [
    PjSigninComponent
  ]
})
export class PjSigninModule { }
