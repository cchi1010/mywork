import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjToolbarComponent } from './pj-toolbar.component';

@NgModule({
  declarations: [
    PjToolbarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PjToolbarComponent
  ]
})
export class PjToolbarModule { }
