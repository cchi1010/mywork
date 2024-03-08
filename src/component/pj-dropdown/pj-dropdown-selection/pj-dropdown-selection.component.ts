import { Component, Input } from '@angular/core';
import { HasStringValue, PjDropdownItem } from 'src/component/components.global';
import { PjDropdownGroupComponent } from '../pj-dropdown-group.component';
import { PjDropdownComponent } from '../pj-dropdown/pj-dropdown.component';

@Component({
  selector: 'pj-dropdown-selection',
  templateUrl: '../pj-dropdown-group.component.html',
  styleUrls: [],
})
export class PjDropdownSelectionComponent extends PjDropdownGroupComponent {

  @Input()
  emptyLabel?: string;

  override ngOnInit(): void {
    super.ngOnInit();
    this._dropdownType = 'selection';
  }

  ngOnChanges(): void {
    if (this.item == null) {
      if (HasStringValue(this.emptyLabel)) {
        this.item = { label: this.emptyLabel || '', value: '' };
      } else {
        this.item = this.menuItems[0];
      }
    }
  }

  override onItemClick(clickedItem: PjDropdownItem, elm: PjDropdownComponent): void {
    super.onItemClick(clickedItem);
    if (elm != null) {
      elm.opened.next(false);
    }
    this.item = clickedItem;
  }
}
