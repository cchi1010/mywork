import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjQuickEditComponent } from './pj-quick-edit.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjTextEntryModule } from '../pj-text-entry/pj-text-entry.module';



@NgModule({
  declarations: [
    PjQuickEditComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule
  ],
  exports: [
    PjQuickEditComponent
  ]
})
export class PjQuickEditModule { }
