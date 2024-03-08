import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjFieldValueModule } from 'src/component/pj-field-value/pj-field-value.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjDocumentSectionComponent } from './pj-document-section.component';
import { PjDocumentSectionDirective } from './pj-document-section.directive';



@NgModule({
  declarations: [
    PjDocumentSectionComponent,
    PjDocumentSectionDirective
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjFieldValueModule
  ],
  exports: [
    PjDocumentSectionComponent
  ]
})
export class PjDocumentSectionModule { }
