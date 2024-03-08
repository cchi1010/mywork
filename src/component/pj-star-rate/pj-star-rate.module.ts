import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjStarRateComponent } from './pj-star-rate.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjLinkModule } from '../pj-link/pj-link.module';

@NgModule({
  declarations: [
    PjStarRateComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjLinkModule
  ],
  exports: [
    PjStarRateComponent
  ],
})
export class PjStarRateModule { }
