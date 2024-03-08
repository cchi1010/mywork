import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HasStringValue, PJ_COMPONENT_STYLE, PjHelperItem } from '../components.global';

@Component({
  selector: 'pj-helper-box',
  templateUrl: './pj-helper-box.component.html',
  styleUrls: ['./pj-helper-box.component.scss'],
})
export class PjHelperBoxComponent implements OnInit {
  @Input()
  helperItems = new Array<PjHelperItem>();

  @Input()
  closeable: boolean = true;

  closeBtnClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.helperItems.forEach((item) => {
      item.iconClass = item?.style;
      if (item?.iconName == null || item?.iconName.length == 0) {
        switch (item.style) {
          case PJ_COMPONENT_STYLE.INFO:
            item.iconName = 'info';
            break;
          case PJ_COMPONENT_STYLE.SUCCESS:
            item.iconName = 'check_circle';
            break;
          case PJ_COMPONENT_STYLE.WARN:
            item.iconName = 'warning';
            break;
          case PJ_COMPONENT_STYLE.ERROR:
            item.iconName = 'error';
            break;
          default:
            item.iconName = '';
        }
      }
    });
  }

  getDescriptionClass(item: PjHelperItem): string {
    return item?.style == PJ_COMPONENT_STYLE.SUCCESS ? 'emphasis' : '';
  }

  hasMultipleLine(): boolean {
    return this.helperItems != null && this.helperItems.length > 1
      ? true
      : false;
  }

  hasFirstItemIcon(): boolean {
    if (this.helperItems == null || this.helperItems.length == 0) {
      return false;
    }
    return HasStringValue(this.helperItems[0].iconName);
  }
  getFirstItemIconClass(): string {
    if (this.helperItems == null || this.helperItems.length == 0) {
      return '';
    }
    return this.helperItems[0].iconClass || '';
  }

  getFirstItemIconName(): string {
    if (this.helperItems == null || this.helperItems.length == 0) {
      return '';
    }
    return this.helperItems[0].iconName || '';
  }

  getFirstItemTitle(): string {
    if (this.helperItems == null || this.helperItems.length == 0) {
      return '';
    }
    return this.helperItems[0].title || '';
  }

  getFirstItemDescription(): string {
    if (this.helperItems == null || this.helperItems.length == 0) {
      return '';
    }
    return this.helperItems[0].description || '';
  }
  isCloseable(): boolean {
    return this.closeable;
  }
  onCloseBtnClick(): void {
    this.closeBtnClick.emit();
  }
}
