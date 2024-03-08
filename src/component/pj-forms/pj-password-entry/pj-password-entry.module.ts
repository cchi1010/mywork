import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjPasswordEntryComponent } from './pj-password-entry.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjCheckboxModule } from 'src/component/pj-choice-box/pj-checkbox/pj-checkbox.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTermNoticeModule } from '../../pj-term-notice/pj-term-notice.module';



@NgModule({
  declarations: [
    PjPasswordEntryComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjButtonModule,
    PjCheckboxModule,
    PjDividerModule,
    PjTermNoticeModule
  ],
  exports: [
    PjPasswordEntryComponent
  ]
})
export class PjPasswordEntryModule { }
