import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSideCollapsibleComponent } from './pj-side-collapsible.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjSideCollapsibleComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule
  ],
  exports: [
    PjSideCollapsibleComponent
  ]
})
export class PjSideCollapsibleModule { }

