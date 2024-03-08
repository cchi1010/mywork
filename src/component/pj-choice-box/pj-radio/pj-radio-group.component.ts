import { Component, EventEmitter, Output, QueryList } from '@angular/core';
import { timer } from 'rxjs';
import { PjRadioItem } from 'src/component/components.global';
import { PjChoiceGroupComponent } from '../pj-choice-group.component';
import { PjChoiceItemDirective } from '../pj-choice-item.derictive';

@Component({
  selector: 'pj-radio-group',
  templateUrl: '../pj-choice-group.component.html',
  styleUrls: ['../pj-choice-group.component.scss'],
})
export class PjRadioGroupComponent extends PjChoiceGroupComponent {

  @Output()
  changeEvent = new EventEmitter<PjRadioItem>();

  ngOnInit(): void {
    this._type = 'radio';
  }

  onItemClick(item: PjRadioItem, that?: PjRadioGroupComponent, choiceItems?: QueryList<PjChoiceItemDirective>): void {
    if (!item.disabled) {
      if (that == null) {
        that = this;
      }
      that.items?.forEach((value) => {
        value.checked = false;
      });
      timer(10).subscribe(() => {
        item.checked = true;
        choiceItems?.forEach(ci => {
          if (ci.groupItem != null) {
            ci.groupItem.checked = false;
            if (ci.itemValue === item.value) {
              ci.groupItem.checked = item.checked;
            }
          }
        });
        that?.changeEvent.emit(item);
      })
    }
  }
}
