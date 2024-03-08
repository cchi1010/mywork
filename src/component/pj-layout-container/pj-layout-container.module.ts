import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjLayoutContainerComponent } from './pj-layout-container.component';
import { PjLayoutGridComponent } from './pj-layout-grid/pj-layout-grid.component';
import { PjLayoutFlexComponent } from './pj-layout-flex/pj-layout-flex.component';
import { PjContainerItemDirective } from './pj-container-item.directive';

@NgModule({
  declarations: [
    PjLayoutContainerComponent,
    PjLayoutGridComponent,
    PjLayoutFlexComponent,
    PjContainerItemDirective,
  ],
  imports: [CommonModule],
  exports: [
    PjLayoutGridComponent,
    PjLayoutFlexComponent,
    PjContainerItemDirective,
  ],
})
export class PjLayoutContainerModule {}
