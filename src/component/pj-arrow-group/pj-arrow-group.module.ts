import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjArrowGroupComponent } from './pj-arrow-group.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';

@NgModule({
  declarations: [PjArrowGroupComponent],
  imports: [CommonModule, PjButtonModule, PjDirectiveModule],
  exports: [PjArrowGroupComponent],
})
export class PjArrowGroupModule {}

