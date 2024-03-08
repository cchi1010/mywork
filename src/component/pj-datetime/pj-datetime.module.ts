import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';

import { PjDateComponent } from './pj-date/pj-date.component';
import { PjDatetimeComponent } from './pj-datetime.component';
import { PjTimeComponent } from './pj-time/pj-time.component';
import { PjDatePickerComponent } from './pj-date-picker/pj-date-picker.component';

@NgModule({
  declarations: [
    PjDateComponent,
    PjTimeComponent,
    PjDatetimeComponent,
    PjDatePickerComponent,
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjTextEntryModule,
    // MatDatepickerModule,
  ],
  exports: [
    PjDateComponent,
    PjTimeComponent,
    PjDatetimeComponent,
    PjDatePickerComponent
  ],
})
export class PjDatetimeModule { }
