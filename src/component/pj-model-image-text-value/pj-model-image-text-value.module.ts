import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjModelImageTextValueComponent } from './pj-model-image-text-value.component';



@NgModule({
  declarations: [
    PjModelImageTextValueComponent
  ],
  imports: [
    CommonModule,
    PjImageModule,
    PjIconModule
  ],
  exports: [
    PjModelImageTextValueComponent
  ]
})
export class PjModelImageTextValueModule { }
