import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjBadgeModule } from 'src/component/pj-badge/pj-badge.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjDividerModule } from '../pj-divider/pj-divider.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDropdownActionComponent } from './pj-dropdown-action/pj-dropdown-action.component';
import { PjDropdownBoxComponent } from './pj-dropdown-box/pj-dropdown-box.component';
import { PjDropdownHeaderComponent } from './pj-dropdown-header/pj-dropdown-header.component';
import { PjDropdownItemComponent } from './pj-dropdown-item/pj-dropdown-item.component';
import { PjDropdownOptionComponent } from './pj-dropdown-option/pj-dropdown-option.component';
import { PjDropdownSelectionComponent } from './pj-dropdown-selection/pj-dropdown-selection.component';
import { PjDropdownDirective } from './pj-dropdown.directive';
import { PjDropdownComponent } from './pj-dropdown/pj-dropdown.component';

@NgModule({
  declarations: [
    PjDropdownActionComponent,
    PjDropdownOptionComponent,
    PjDropdownSelectionComponent,
    PjDropdownComponent,
    PjDropdownItemComponent,
    PjDropdownBoxComponent,
    PjDropdownHeaderComponent,
    PjDropdownDirective
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjIconModule,
    PjDividerModule,
    PjBadgeModule,
  ],
  exports: [
    PjDropdownComponent,
    PjDropdownBoxComponent,
    PjDropdownActionComponent,
    PjDropdownOptionComponent,
    PjDropdownSelectionComponent,
    PjDropdownDirective,
    PjDropdownItemComponent,
  ],
})
export class PjDropdownModule { }
