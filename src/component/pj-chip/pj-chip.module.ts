import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjChipInputComponent } from './pj-chip-input/pj-chip-input.component';
import { PjArrowGroupModule } from '../pj-arrow-group/pj-arrow-group.module';
import { PjCarouselModule } from '../pj-carousel/pj-carousel.module';
import { PjChipGroupComponent } from './pj-chip-group/pj-chip-group.component';
import { PjChipFilterComponent } from './pj-chip-filter/pj-chip-filter.component';

@NgModule({
  declarations: [
    PjChipInputComponent,
    PjChipFilterComponent,
    PjChipGroupComponent
  ],
  imports: [
    CommonModule,
    PjIconModule,
    PjDirectiveModule,
    PjImageModule,
    PjArrowGroupModule,

    PjCarouselModule
  ],
  exports: [
    PjChipInputComponent,
    PjChipFilterComponent,
    PjChipGroupComponent
  ],
})
export class PjChipModule { }
