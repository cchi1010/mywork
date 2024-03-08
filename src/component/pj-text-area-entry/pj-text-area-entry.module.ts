import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PjTextAreaEntryComponent } from './pj-text-area-entry.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjTextAreaEntryComponent],
  imports: [
    CommonModule,

    PjDirectiveModule,
    ReactiveFormsModule
  ],
  exports: [PjTextAreaEntryComponent],
})
export class PjTextAreaEntryModule {}
