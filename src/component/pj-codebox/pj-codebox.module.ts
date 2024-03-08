import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjCodeboxComponent } from './pj-codebox.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjCodeboxComponent],
  imports: [CommonModule, PjDirectiveModule],
  exports: [PjCodeboxComponent],
})
export class PjCodeboxModule {}
