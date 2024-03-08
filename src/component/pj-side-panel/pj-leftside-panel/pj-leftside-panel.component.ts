import { Component } from '@angular/core';
import { pjLeftToRightAnimation } from 'src/component/pj-animations/pj-left-right.animation';
import { pjModalBgAnimation } from 'src/component/pj-animations/pj-modal-bg.animation';
import { PjSidePanelComponent } from '../pj-side-panel.component';

@Component({
  selector: 'pj-leftside-panel',
  templateUrl: './pj-leftside-panel.component.html',
  styleUrls: ['../pj-side-panel.component.scss'],
  animations: [pjLeftToRightAnimation, pjModalBgAnimation],
})
export class PjLeftsidePanelComponent extends PjSidePanelComponent {

}
