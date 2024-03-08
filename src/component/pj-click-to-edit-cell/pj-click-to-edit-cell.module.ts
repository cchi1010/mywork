import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CommonModule } from '@angular/common';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjClickToEditCellComponent } from './pj-click-to-edit-cell.component';


@NgModule({
  declarations: [
    PjClickToEditCellComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule,
  ],
  exports: [
    PjClickToEditCellComponent
  ]
})
export class PjClickToEditCellModule { }
