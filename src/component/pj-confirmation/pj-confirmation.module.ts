import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjConfirmationComponent } from './pj-confirmation.component';
import { PjImageModule } from '../pj-image/pj-image.module';

@NgModule({
  declarations: [PjConfirmationComponent],
  imports: [CommonModule, PjImageModule],
  exports: [PjConfirmationComponent],
})
export class PjConfirmationModule {}

