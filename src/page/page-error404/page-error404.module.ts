import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageError404Component } from './page-error404.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjLayoutContainerModule } from 'src/component/pj-layout-container/pj-layout-container.module';



@NgModule({
  declarations: [
    PageError404Component
  ],
  imports: [

    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjLayoutContainerModule
  ],
  exports: [
    PageError404Component
  ]
})
export class PageError404Module { }
