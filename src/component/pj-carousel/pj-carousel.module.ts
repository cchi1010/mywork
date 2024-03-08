import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjCarouselComponent } from './pj-carousel.component';
import { SwiperModule } from 'swiper/angular';
import { PjArrowGroupModule } from '../pj-arrow-group/pj-arrow-group.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjSwiperItemDirective } from './pj-carousel.directive';
import { PjButtonModule } from '../pj-button/pj-button.module';

@NgModule({
  declarations: [
    PjCarouselComponent,
    PjSwiperItemDirective
  ],
  imports: [
    CommonModule,
    SwiperModule,
    PjDirectiveModule,
    PjButtonModule,
    PjArrowGroupModule
  ],
  exports: [
    PjCarouselComponent,
    PjSwiperItemDirective
  ],
})
export class PjCarouselModule { }
