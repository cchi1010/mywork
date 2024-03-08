import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjLoadingComponent } from './pj-loading.component'
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjModalBgModule } from 'src/directive/pj-modal-bg.directive';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjLoadingService } from './pj-loading.service';


@NgModule({
  declarations: [PjLoadingComponent],
  imports: [
    CommonModule,
    PjIconModule,
    PjModalBgModule,
    PjDirectiveModule, 
    PjImageModule
  ],
  providers: [PjLoadingService],
  exports: [PjLoadingComponent]
})
export class PjLoadingModule { }
