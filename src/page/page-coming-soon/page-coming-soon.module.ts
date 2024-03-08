import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComingSoonComponent } from './page-coming-soon.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';



@NgModule({
  declarations: [
    PageComingSoonComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule
  ],
  exports: [
    PageComingSoonComponent
  ]
})
export class PageComingSoonModule { }
