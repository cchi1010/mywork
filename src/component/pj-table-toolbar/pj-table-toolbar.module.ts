import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PjTableComponent } from 'src/component/pj-table/pj-table.component';
import { PjTableToolbarComponent } from './pj-table-toolbar.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';

@NgModule({
  declarations: [
    PjTableToolbarComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule,
    PjButtonModule,
    PjDropdownModule
  ],

  exports: [
    PjTableToolbarComponent
  ]
})
export class PjTableToolbarModule { }
