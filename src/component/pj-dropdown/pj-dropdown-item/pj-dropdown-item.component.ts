import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArrayIsNotEmpty, HasStringValue, isTrue, PJ_SIZE } from 'src/component/components.global';
import { PjDropdownItem } from 'src/component/components.global';

@Component({
  selector: 'pj-dropdown-item',
  templateUrl: './pj-dropdown-item.component.html',
  styleUrls: ['./pj-dropdown-item.component.scss'],
})
export class PjDropdownItemComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  dropdownItem?: PjDropdownItem;

  @Input()
  disabledItemClickable: boolean = false;

  @Output()
  itemClicked = new EventEmitter<PjDropdownItem>();

  constructor() { }

  ngOnInit(): void { }

  hasIcon(): boolean {
    return HasStringValue(this.dropdownItem?.iconName);
  }

  hasIamge(): boolean {
    return HasStringValue(this.dropdownItem?.imageName);
  }

  getImageSrc(): string {
    return this.dropdownItem?.imageName || '';
  }

  hasSubMenu(): boolean {
    return ArrayIsNotEmpty(this.dropdownItem?.subMenus);
  }

  onClick(): void {
    if (this.disabledItemClickable || !this.dropdownItem?.disabled){
      this.itemClicked.emit(this.dropdownItem);
    }
  }

  getDisabledClass(): string {
    return isTrue(this.dropdownItem?.disabled) ? 'disabled' : '';
  }
  getItemClass(): string {
    if (HasStringValue(this.dropdownItem?.description)) {
      return 'withDescription';
    }
    return 'labelOnly';
  }
  hasBadge(): boolean {
    return HasStringValue(this.dropdownItem?.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.dropdownItem?.badgeLabel || '';
  }

  getBageSize(): string {
    return this.pjSize == PJ_SIZE.MEDIUM ? PJ_SIZE.SMALL : PJ_SIZE.MEDIUM;
  }

  isIconVisible(): string {
    let c = 'visible';
    if (this.dropdownItem?.toggleable != null) {
      if (this.dropdownItem.toggleable) {
        if (this.dropdownItem.selected == null || this.dropdownItem.selected == false) {
          c = 'invisible';
        }
      }
    }
    return c;
  }
  getGapSize(): string {
    if (this.pjSize == PJ_SIZE.EXTRA_LARGE || this.pjSize == PJ_SIZE.LARGE) {
      return "gap-x-3";
    } else if (this.pjSize == PJ_SIZE.MEDIUM) {
      return "gap-x-2";
    } else {
      return '';
    }
  }

  getGapClass(): string {
    // return this.toggleItem ? 'gap-2' : 'gap-4';
    return this.dropdownItem?.toggleable ? 'gap-2' : 'gap-4';
  }

  isDivider(): boolean {
    return (this.dropdownItem?.divider == null) ? false : this.dropdownItem?.divider;
  }

  isNotDivider(): boolean {
    return !this.isDivider();
  }

  getIconName(): string {
    return this.dropdownItem?.iconName || '';
  }

  getLabel(): string {
    return this.dropdownItem?.label || '';
  }

  hasDescription(): boolean {
    return HasStringValue(this.dropdownItem?.description);
  }
  getDescription(): string {
    return this.dropdownItem?.description || '';
  }
}
