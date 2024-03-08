import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSearchBarComponent } from './pj-search-bar.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjDropdownModule } from '../pj-dropdown/pj-dropdown.module';
import { PjKeywordComponent } from './pj-keyword/pj-keyword.component';
import { PjSearchHistoryComponent } from './pj-search-history/pj-search-history.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';


@NgModule({
  declarations: [
    PjSearchBarComponent,
    PjKeywordComponent,
    PjSearchHistoryComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    ReactiveFormsModule,
    PjButtonModule,
    PjDropdownModule,
    PjIconModule
  ],
  exports: [
    PjSearchBarComponent,
    PjKeywordComponent
  ]
})
export class PjSearchBarModule { }
