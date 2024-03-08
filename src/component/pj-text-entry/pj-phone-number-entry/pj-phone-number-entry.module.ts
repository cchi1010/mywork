import { NgModule } from '@angular/core';
import { PjPhoneNumberEntryComponent } from './pj-phone-number-entry.component';
import { CommonModule } from '@angular/common';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTextEntryModule } from '../pj-text-entry.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjPerfixInputModule } from '../pj-perfix-input/pj-perfix-input.module';
import { PhoneNumberDirective } from './pj-phone-number.directive';


@NgModule({
  declarations: [
    PjPhoneNumberEntryComponent,
    PhoneNumberDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PjDirectiveModule,
    PjTextEntryModule,
    PjIconModule,
    PjPerfixInputModule,
  ],
  exports: [
    PjPhoneNumberEntryComponent,
    PhoneNumberDirective,
  ]
})
export class PjPhoneNumberEntryModule { }

