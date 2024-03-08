import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjCheckboxComponent } from './pj-checkbox.component';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
@NgModule({
  declarations: [PjCheckboxComponent],
  imports: [CommonModule,PjIconModule],
  exports: [PjCheckboxComponent],
})
export class PjCheckboxModule {}
