import { PjChipModule } from 'src/component/pj-chip/pj-chip.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CommonModule } from '@angular/common';

import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjInputChipCellComponent } from './pj-input-chip-cell.component';



@NgModule({
  declarations: [
    PjInputChipCellComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule,
    PjChipModule,
  ],
  exports: [
    PjInputChipCellComponent
  ]
})
export class PjInputChipCellModule { }
