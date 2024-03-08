import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjPopoverModule } from 'src/component/pj-popover/pj-popover.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjDropdownDirective } from 'src/component/pj-dropdown/pj-dropdown.directive';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CommonModule } from '@angular/common';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjInputDropdownCellComponent } from './pj-input-dropdown-cell.component';



@NgModule({
  declarations: [
    PjInputDropdownCellComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjTextEntryModule,
    PjDropdownModule,
    PjDividerModule,
    PjPopoverModule,
    PjIconModule,
  ],
  exports: [
    PjInputDropdownCellComponent
  ]
})
export class PjInputDropdownCellModule { }
