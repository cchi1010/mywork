import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjActionCardComponent } from './pj-action-card.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';

@NgModule({
  declarations: [PjActionCardComponent],
  imports: [CommonModule, PjDirectiveModule, PjImageModule],
  exports: [PjActionCardComponent],
})
export class PjActionCardModule {}

