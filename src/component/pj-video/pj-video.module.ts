import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjVideoComponent } from './pj-video.component';
import { PjBadgeModule } from 'src/component/pj-badge/pj-badge.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';


@NgModule({
  declarations: [
    PjVideoComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule,
    PjBadgeModule,
    PjIconModule,
  ],
  exports: [
    PjVideoComponent
  ],
})
export class PjVideoModule {}

// export type PjImageType = 'rectangle' | 'circle' | undefined;

export const PjVideoTypeConst = {
  RECTANGLE: 'rectangle',// as PjImageType,
  CIRCLE: 'circle'// as PjImageType,
};
