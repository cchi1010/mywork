import { Component } from '@angular/core';
import { PjDropdownGroupComponent } from '../pj-dropdown-group.component';

@Component({
  selector: 'pj-dropdown-option',
  templateUrl: '../pj-dropdown-group.component.html',
  styleUrls: [],
})
export class PjDropdownOptionComponent extends PjDropdownGroupComponent {
  override ngOnInit(): void {
    super.ngOnInit();
    this._dropdownType = 'option';
  }
  override hasHeader(): boolean {
    if (this.item == null) {
      this.item = this.menuItems[0];
    }
    return true;
  }
}
