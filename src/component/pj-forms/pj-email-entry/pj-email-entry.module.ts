import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTermNoticeModule } from '../../pj-term-notice/pj-term-notice.module';
import { PjEmailEntryComponent } from './pj-email-entry.component';



@NgModule({
  declarations: [
    PjEmailEntryComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjDividerModule,
    PjButtonModule,
    PjTermNoticeModule
  ],
  exports: [
    PjEmailEntryComponent
  ]
})
export class PjEmailEntryModule { }
