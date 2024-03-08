import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PjModalBgModule } from 'src/directive/pj-modal-bg.directive';
import { PjLeftsidePanelComponent } from './pj-leftside-panel/pj-leftside-panel.component';
import { PjRightsidePanelComponent } from './pj-rightside-panel/pj-rightside-panel.component';



@NgModule({
  declarations: [
    PjLeftsidePanelComponent,
    PjRightsidePanelComponent
  ],
  imports: [
    CommonModule,

    PjModalBgModule,
  ],
  exports: [
    PjLeftsidePanelComponent,
    PjRightsidePanelComponent
  ]
})
export class PjSidePanelModule { }
