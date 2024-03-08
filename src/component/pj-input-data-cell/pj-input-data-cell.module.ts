import { PjButtonModule } from 'src/component/pj-button/pj-button.module';

import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CommonModule } from '@angular/common';
import { PjPerfixInputModule } from 'src/component/pj-text-entry/pj-perfix-input/pj-perfix-input.module';
import { PjArrowGroupModule } from 'src/component/pj-arrow-group/pj-arrow-group.module';
import { PjInputDataCellComponent } from './pj-input-data-cell.component';


@NgModule({
  declarations: [
    PjInputDataCellComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjPerfixInputModule,
    PjButtonModule,
    PjArrowGroupModule,
  ],
  exports: [
    PjInputDataCellComponent
  ]
})
export class PjInputDataCellModule { }
