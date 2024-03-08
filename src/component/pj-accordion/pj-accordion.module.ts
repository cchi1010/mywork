import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjInLineAccordionComponent } from './pj-inline-accordion/pj-inline-accordion.component';
import { PjRoundAccordionComponent } from './pj-round-accordion/pj-round-accordion.component';

@NgModule({
  declarations: [
    PjInLineAccordionComponent,
    PjRoundAccordionComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule, 
    PjIconModule
  ],
  exports: [
    PjInLineAccordionComponent,
    PjRoundAccordionComponent
  ],
})
export class PjAccordionModule {}
