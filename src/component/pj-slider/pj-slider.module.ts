import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSingleSliderComponent } from './pj-single-slider.component';
import { PjDoubleSliderComponent } from './pj-double-slider.component';


@NgModule({
  declarations: [PjSingleSliderComponent, PjDoubleSliderComponent],
  imports: [CommonModule, PjDirectiveModule],
  exports: [PjSingleSliderComponent, PjDoubleSliderComponent],
})
export class PjSliderModule { }

