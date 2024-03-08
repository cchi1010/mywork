import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjFileComponent } from './pj-file.component';

@NgModule({
  declarations: [
    PjFileComponent,
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjIconModule,
    PjButtonModule
  ],
  exports: [
    PjFileComponent,
  ],
})
export class PjFileModule {}
