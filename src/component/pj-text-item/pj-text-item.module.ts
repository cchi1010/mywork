import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjTextItemComponent } from './pj-text-item.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';


@NgModule({
  declarations: [
    PjTextItemComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule
  ],
  exports: [
    PjTextItemComponent
  ]
})
export class PjTextItemModule { }
