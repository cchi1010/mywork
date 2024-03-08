import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjHeaderComponent } from './pj-header.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjHeaderComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule
  ],
  exports: [
    PjHeaderComponent
  ]
})
export class PjHeaderModule { }
