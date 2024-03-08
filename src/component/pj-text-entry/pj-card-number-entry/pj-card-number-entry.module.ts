import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjCardNumberEntryComponent } from './pj-card-number-entry.component';
import { PjTextEntryModule } from '../pj-text-entry.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CardNumberEntryDirective } from './pj-card-number-entry.directive';



@NgModule({
  declarations: [
    PjCardNumberEntryComponent,
    CardNumberEntryDirective
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjTextEntryModule,
    PjIconModule,
    PjImageModule,
  ],
  exports: [
    PjCardNumberEntryComponent,
    CardNumberEntryDirective
  ]
})
export class PjCardNumberEntryModule { }
