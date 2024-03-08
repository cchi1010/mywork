import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjAvatarComponent } from './pj-avatar.component';

@NgModule({
  declarations: [PjAvatarComponent],
  imports: [CommonModule, PjIconModule, PjImageModule],
  exports: [PjAvatarComponent],
})
export class PjAvatarModule {}
