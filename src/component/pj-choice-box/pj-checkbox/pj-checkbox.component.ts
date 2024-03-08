import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PjChoiceBoxComponent } from '../pj-choice-box.component';
@Component({
  selector: 'pj-checkbox',
  templateUrl: '../pj-choice-box.component.html',
  styleUrls: ['../pj-choice-box.component.scss']
})
export class PjCheckboxComponent extends PjChoiceBoxComponent {

  @Input()
  particialCheck?= false;

  @Output()
  changedEvent = new EventEmitter<boolean>();

  override onClick(): void {
    this.checked = !this.checked;
    this.particialCheck = false;
    this.changedEvent.emit(this.checked);
  }

  override getCompCheckedClass(): string {
    return (this.checked || this.particialCheck) ? 'checked' : '';
  }

  getIconName(): string {
    if (this.particialCheck) {
      return 'indeterminate_check_box';
    } else {
      if (this.checked) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
    }
  }
}
