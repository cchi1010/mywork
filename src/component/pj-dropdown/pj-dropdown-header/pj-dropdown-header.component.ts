import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PJ_SIZE, PjDropdownItem } from 'src/component/components.global';

@Component({
  selector: 'pj-dropdown-header',
  templateUrl: './pj-dropdown-header.component.html',
  styleUrls: ['./pj-dropdown-header.component.scss'],
})
export class PjDropdownHeaderComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  item?: PjDropdownItem;

  @Input()
  focused = false;

  @Input()
  disabled = false;

  @Input()
  label?: string;

  @Input()
  error = false;

  @Input()
  noSelection?: boolean;

  constructor() { }

  ngOnInit(): void { }

  hasIcon(): boolean {
    return HasStringValue(this.item?.iconName);
  }

  getHeaderClass(): string {
    let headerClass = this.pjSize || PJ_SIZE.MEDIUM;
    if (this.pjSize === PJ_SIZE.EXTRA_LARGE) {
      headerClass = headerClass + ' gap-3'
    } else {
      headerClass = headerClass + ' gap-2'
    }
    if(this.error) {
      headerClass = headerClass + ' error';
      return headerClass;
    }
    if (this.focused) {
      headerClass = headerClass + ' focused';
    } else {
      if (this.disabled) {
        headerClass = headerClass + ' disabled';
      }
    }
    if(this.noSelection) {
      headerClass = headerClass + ' notSelected';
    }
    return headerClass;
  }
  getIconName(): string {
    return this.item?.iconName || '';
  }

  hasIamge(): boolean {
    return HasStringValue(this.item?.imageName);
  }

  getImageSrc(): string {
    return this.item?.imageName || '';
  }

  getImageSize(): number {
    return 24;
  }

  hasFieldLabel(): boolean {
    return HasStringValue(this.label);
  }
  getFieldLabel(): string {
    return this.label || '';
  }

  getLabel(): string {
    return this.item?.label || '';
  }

  getGapClass(): string {
    return (this.pjSize === PJ_SIZE.MEDIUM) ? 'gap-1.5' : 'gap-2';
  }

  onClick(event: Event): void {
    if(this.disabled) {
      event.stopPropagation();
    }
  }
}
