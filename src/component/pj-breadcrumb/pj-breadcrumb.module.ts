import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjBreadcrumbComponent } from './pj-breadcrumb.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjBreadcrumbComponent],
  imports: [CommonModule, PjDirectiveModule, PjIconModule],
  exports: [PjBreadcrumbComponent],
})
export class PjBreadcrumbModule {}
