import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTwoColumnsComponent } from './page-two-columns/page-two-columns.component';

@NgModule({
  declarations: [
    PageTwoColumnsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageTwoColumnsComponent
  ]
})
export class PageLayoutModule { }
