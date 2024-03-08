import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSecurityQuestionComponent } from './pj-security-question.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjPanelModule } from 'src/component/pj-panel/pj-panel.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjSecurityQuestionComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjButtonModule,
    PjPanelModule    
  ],
  exports: [
    PjSecurityQuestionComponent
  ]
})
export class PjSecurityQuestionModule { }
