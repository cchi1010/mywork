import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjAlertComponent } from './pj-alert.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjAction } from 'src/component/components.global';

@NgModule({
  declarations: [PjAlertComponent],
  imports: [CommonModule, PjDirectiveModule, PjButtonModule, PjIconModule],
  exports: [PjAlertComponent],
})
export class PjAlertModule {}

