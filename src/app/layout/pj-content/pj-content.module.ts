import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PjContentComponent } from './pj-content.component';
import { PjBreadcrumbModule } from 'src/component/pj-breadcrumb/pj-breadcrumb.module';
import { PjLayoutContainerModule } from 'src/component/pj-layout-container/pj-layout-container.module';



@NgModule({
  declarations: [
    PjContentComponent
  ],
  imports: [
    RouterModule,
    CommonModule,

    PjLayoutContainerModule,
    PjBreadcrumbModule
  ],
  exports: [
    PjContentComponent
  ]
})
export class PjContentModule { }
