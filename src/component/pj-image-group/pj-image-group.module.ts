import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjImageGroupComponent } from './pj-image-group.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjImageModule } from '../pj-image/pj-image.module';

@NgModule({
  declarations: [PjImageGroupComponent],
  imports: [CommonModule, PjImageModule, PjIconModule],
  exports: [PjImageGroupComponent],
})
export class PjImageGroupModule {}
