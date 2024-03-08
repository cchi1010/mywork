import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjPanelComponent } from './pj-panel.component';

import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjPanelComponent],
  imports: [CommonModule, PjDirectiveModule],
  exports: [PjPanelComponent],
})
export class PjPanelModule {}
