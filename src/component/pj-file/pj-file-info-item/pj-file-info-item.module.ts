import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjFileInfoItemComponent } from './pj-file-info-item.component';



@NgModule({
  declarations: [
    PjFileInfoItemComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule,
    PjImageModule
  ],
  exports: [
    PjFileInfoItemComponent
  ]
})
export class PjFileInfoItemModule { }
