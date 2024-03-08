import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjCaptchaDirectiveModule } from 'src/directive/pj-recaptcha.directive';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjPasswordResetbyemailComponent } from './pj-password-resetbyemail.component';

@NgModule({
  declarations: [
    PjPasswordResetbyemailComponent
  ],
  imports: [
    CommonModule,
    
    PjCaptchaDirectiveModule,
    PjTextEntryModule,
    PjButtonModule,
    PjDirectiveModule
  ],
  exports: [
    PjPasswordResetbyemailComponent
  ]
})
export class PjPasswordResetbyemailModule { }
