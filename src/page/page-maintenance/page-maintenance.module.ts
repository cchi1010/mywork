import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMaintenanceComponent } from './page-maintenance.component';
import { PjLayoutContainerModule } from 'src/component/pj-layout-container/pj-layout-container.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';



@NgModule({
  declarations: [
    PageMaintenanceComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjLayoutContainerModule
  ],
  exports: [
    PageMaintenanceComponent
  ]
})
export class PageMaintenanceModule { }
