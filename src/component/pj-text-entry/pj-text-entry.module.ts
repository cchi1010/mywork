import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';

import { PjTextEntryComponent } from './pj-text-entry.component';

@NgModule({
  declarations: [
    PjTextEntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PjDirectiveModule,
    PjIconModule
  ],
  exports: [
    PjTextEntryComponent
  ],
})
export class PjTextEntryModule { }
