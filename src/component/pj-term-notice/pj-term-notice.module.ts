import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjTermNoticeComponent } from './pj-term-notice.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjTermNoticeComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule
  ],
  exports: [
    PjTermNoticeComponent
  ]
})
export class PjTermNoticeModule { }
