import { ReactiveFormsModule } from '@angular/forms';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjPerfixInputComponent } from './pj-perfix-input.component';
import { PjTextEntryModule } from '../pj-text-entry.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';


@NgModule({
  declarations: [
    PjPerfixInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PjDirectiveModule,
    PjTextEntryModule,
    PjIconModule

  ],
  exports: [
    PjPerfixInputComponent
  ]
})
export class PjPerfixInputModule { }
