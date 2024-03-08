import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjHelperBoxModule } from 'src/component/pj-helper-box/pj-helper-box.module';
import { PjTermNoticeModule } from 'src/component/pj-term-notice/pj-term-notice.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjCaptchaDirectiveModule } from 'src/directive/pj-recaptcha.directive';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjNewPasswordModule } from '../pj-new-password/pj-new-password.module';
import { PjRegisterFormComponent } from './pj-register-form.component';
@NgModule({
  declarations: [
    PjRegisterFormComponent
  ],
  imports: [
    CommonModule,
    
    PjCaptchaDirectiveModule,

    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule,
    PjDividerModule,
    PjHelperBoxModule,
    PjTermNoticeModule,
    PjNewPasswordModule
  ],
  exports: [
    PjRegisterFormComponent
  ]
})
export class PjRegisterFormModule { }
