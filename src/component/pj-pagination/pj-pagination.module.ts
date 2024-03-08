import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjPaginationComponent } from './pj-pagination.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjPaginationItemComponent } from './pj-pagination-item/pj-pagination-item.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PjPaginationComponent,
    PjPaginationItemComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule
  ],
  exports: [
    PjPaginationComponent
  ]
})
export class PjPaginationModule { }
