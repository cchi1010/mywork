import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjDlgRemoveComponent } from './pj-dlg-remove.component';
import { PjButtonModule } from '../../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageModule } from '../../pj-image/pj-image.module';
import { PjModalBgModule } from 'src/directive/pj-modal-bg.directive';

@NgModule({
  declarations: [
    PjDlgRemoveComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule, 
    PjImageModule, 
    PjButtonModule,
    PjModalBgModule,

  ],
  exports: [PjDlgRemoveComponent],
})
export class PjDlgRemoveModule {}
