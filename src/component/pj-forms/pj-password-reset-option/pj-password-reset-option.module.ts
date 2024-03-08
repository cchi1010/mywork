import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjPasswordResetOptionComponent } from './pj-password-reset-option.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjPanelModule } from 'src/component/pj-panel/pj-panel.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjPasswordResetOptionComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjPanelModule,
    PjButtonModule
  ],
  exports: [
    PjPasswordResetOptionComponent
  ]
})
export class PjPasswordResetOptionModule { }
