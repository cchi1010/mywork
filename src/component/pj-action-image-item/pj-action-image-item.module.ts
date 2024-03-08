import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjActionImageItemComponent } from './pj-action-image-item.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjImageModule } from '../pj-image/pj-image.module';



@NgModule({
  declarations: [
    PjActionImageItemComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule,
    PjImageModule,
    PjIconModule,
    PjDirectiveModule,
  ],
  exports: [
    PjActionImageItemComponent
  ]
})
export class PjActionImageItemModule { }
