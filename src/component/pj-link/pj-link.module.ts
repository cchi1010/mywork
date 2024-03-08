import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjLinkComponent } from './pj-link.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjLinkGenericComponent } from './pj-link-generic/pj-link-generic.component';

@NgModule({
  declarations: [
    PjLinkComponent,
    PjLinkGenericComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
  ],
  exports: [
    PjLinkComponent,
    PjLinkGenericComponent
  ]
})
export class PjLinkModule { }
