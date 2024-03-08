import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PjMediaShowComponent } from './pj-media-show.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjCarouselModule } from '../pj-carousel/pj-carousel.module';

@NgModule({
  declarations: [PjMediaShowComponent],
  imports: [
    CommonModule,
    PjDirectiveModule,
    
    PjImageModule,
    PjButtonModule,

    PjCarouselModule
  ],
  exports: [PjMediaShowComponent],
})
export class PjMediaShowModule {}
