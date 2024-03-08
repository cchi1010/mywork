import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjEditTopicDescComponent } from './pj-edit-topic-desc.component';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';

@NgModule({
  declarations: [
    PjEditTopicDescComponent
  ],
  imports: [
    CommonModule,
    PjDropdownModule,
    PjTextEntryModule
  ],
  exports: [
    PjEditTopicDescComponent
  ]
})
export class PjEditTopicDescModule { }
