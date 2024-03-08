import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjModalWindowComponent } from './pj-modal-window.component';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjDividerModule } from '../pj-divider/pj-divider.module';
import { PjModalBgModule } from 'src/directive/pj-modal-bg.directive';
import { PjModalWindowService } from './pj-modal-window.service';

@NgModule({
  declarations: [
    PjModalWindowComponent
  ],
  imports: [
    CommonModule, 
    PjDirectiveModule, 
    PjDividerModule, 
    PjButtonModule,
    PjModalBgModule
  ],
  providers: [PjModalWindowService],
  exports: [],
})
export class PjModalWindowModule {}
