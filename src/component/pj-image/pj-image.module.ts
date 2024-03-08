import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageComponent } from './pj-image.component';
import { PjBadgeModule } from '../pj-badge/pj-badge.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';

@NgModule({
  declarations: [
    PjImageComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule,
    PjBadgeModule,
    PjIconModule
  ],
  exports: [
    PjImageComponent
  ],
})
export class PjImageModule {}

// export type PjImageType = 'rectangle' | 'circle' | undefined;

