import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjBadgeComponent } from './pj-badge.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjBadgeComponent],
  imports: [CommonModule, PjDirectiveModule, PjIconModule],
  exports: [PjBadgeComponent],
})
export class PjBadgeModule {}
