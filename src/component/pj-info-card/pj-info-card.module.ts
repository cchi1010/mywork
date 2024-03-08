import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjInfoCardComponent } from './pj-info-card.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';

@NgModule({
  declarations: [PjInfoCardComponent],
  imports: [CommonModule, PjIconModule],
  exports: [PjInfoCardComponent],
})
export class PjInfoCardModule {}
