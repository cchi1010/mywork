import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjHelperBoxComponent } from './pj-helper-box.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjPopoverModule } from '../pj-popover/pj-popover.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjHelperBoxService } from './pj-helper-box.service';

@NgModule({
  declarations: [PjHelperBoxComponent],
  imports: [
    CommonModule, 
    PjDirectiveModule, 
    PjButtonModule,
    PjIconModule, 
    PjPopoverModule
  ],
  providers: [PjHelperBoxService],
  exports: [PjHelperBoxComponent],
})
export class PjHelperBoxModule {}
