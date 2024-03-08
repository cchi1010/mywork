import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjActionItemComponent } from './pj-action-item.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjImageModule } from '../pj-image/pj-image.module';

@NgModule({
  declarations: [PjActionItemComponent],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjImageModule,
    PjIconModule,
    PjDirectiveModule,
  ],
  exports: [PjActionItemComponent],
})
export class PjActionItemModule {}
