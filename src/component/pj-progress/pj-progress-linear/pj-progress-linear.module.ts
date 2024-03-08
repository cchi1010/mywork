import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjProgressLinearComponent } from './pj-progress-linear.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjProgressBarModule } from 'src/component/pj-progress/pj-progress-bar/pj-progress-bar.module';

@NgModule({
  declarations: [PjProgressLinearComponent],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjButtonModule,
    PjProgressBarModule,
  ],
  exports: [PjProgressLinearComponent],
})
export class PjProgressLinearModule {}
