import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjActionButtonComponent } from './pj-action-button.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';

@NgModule({
  declarations: [PjActionButtonComponent],
  imports: [CommonModule, PjDirectiveModule, PjIconModule],
  exports: [PjActionButtonComponent],
})
export class PjActionButtonModule {}
