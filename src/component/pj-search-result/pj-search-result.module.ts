import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSearchResultComponent } from './pj-search-result.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';

@NgModule({
  declarations: [
    PjSearchResultComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjIconModule
  ],
  exports: [
    PjSearchResultComponent
  ]
})
export class PjSearchResultModule { }
