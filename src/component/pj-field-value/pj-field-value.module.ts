import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjFieldValueTextComponent } from './pj-field-value-text/pj-field-value-text.component';
import { PjFieldValueActionComponent } from './pj-field-value-action/pj-field-value-action.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjAction } from 'src/component/components.global';

@NgModule({
  declarations: [
    PjFieldValueTextComponent,
    PjFieldValueActionComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule
  ],
  exports: [
    PjFieldValueTextComponent,
    PjFieldValueActionComponent
  ],
})
export class PjFieldValueModule { }

