import { Component } from '@angular/core';
import { PjChoiceBoxComponent } from '../pj-choice-box.component';

@Component({
  selector: 'pj-radio',
  templateUrl: '../pj-choice-box.component.html',
  styleUrls: ['../pj-choice-box.component.scss']
})
export class PjRadioComponent extends PjChoiceBoxComponent {
  getIconName(): string {
    if (this.checked) {
      return 'radio_button_checked';
    } else {
      return 'radio_button_unchecked';
    }
  }
}
