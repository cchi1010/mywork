import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PjFooterComponent } from './pj-footer.component';


@NgModule({
  declarations: [
    PjFooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PjFooterComponent
  ]
})
export class PjFooterModule { }
