import { Component } from '@angular/core';
import { pjModalBgAnimation } from 'src/component/pj-animations/pj-modal-bg.animation';
import { pjRightToLeftAnimation } from 'src/component/pj-animations/pj-right-left.animation';
import { PjSidePanelComponent } from '../pj-side-panel.component';

@Component({
  selector: 'pj-rightside-panel',
  templateUrl: './pj-rightside-panel.component.html',
  styleUrls: ['../pj-side-panel.component.scss'],
  animations: [pjRightToLeftAnimation, pjModalBgAnimation],
})
export class PjRightsidePanelComponent extends PjSidePanelComponent {

}
