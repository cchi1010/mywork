import { Component, EventEmitter, Output, QueryList } from '@angular/core';
import { DIRECTION, PjCheckboxItem } from 'src/component/components.global';
import { PjChoiceGroupComponent } from '../pj-choice-group.component';
import { PjChoiceItemDirective } from '../pj-choice-item.derictive';


@Component({
  selector: 'pj-checkbox-group',
  templateUrl: '../pj-choice-group.component.html',
  styleUrls: ['../pj-choice-group.component.scss'],
})
export class PjCheckboxGroupComponent extends PjChoiceGroupComponent {

  @Output()
  changeEvent = new EventEmitter<PjCheckboxItem[]>();

  ngOnInit(): void {
    this._type = 'checkbox';
    this.items?.forEach((item) => {
      if (item.checked == null) {
        item.checked = false;
      }
    });
  }

  getCheckboxGroupClass(): string {
    if (this.direction == DIRECTION.H) {
      return 'flex flex-row justify-evenly';
    } else {
      return 'flex flex-col gap-2';
    }
  }

  onItemClick(item: PjCheckboxItem, that?: PjCheckboxGroupComponent, choiceItems?: QueryList<PjChoiceItemDirective>): void {
    if (that == null) {
      that = this;
    }
    item.checked = !(item.checked==null?false:item.checked);
    choiceItems?.forEach(ci => {
      if (ci.groupItem != null) {
        if (ci.itemValue === item.value) {
          ci.groupItem.checked = item.checked;
        }
      }
    });
    that.changeEvent.emit(that.items);
  }
}
