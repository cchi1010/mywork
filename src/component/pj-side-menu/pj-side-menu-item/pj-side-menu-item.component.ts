import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ArrayIsNotEmpty, PjSideMenuItem, isTrue } from 'src/component/components.global';

@Component({
  selector: 'pj-side-menu-item',
  templateUrl: './pj-side-menu-item.component.html',
  styleUrls: ['./pj-side-menu-item.component.scss'],
})
export class PjSideMenuItemComponent implements OnInit {

  @ViewChildren(PjSideMenuItemComponent)
  private _allSubItems?: QueryList<PjSideMenuItemComponent>;

  @Input()
  type: 'normal' | 'condensed' = 'normal'; // condensed: 只显示图标的靠边菜单

  @Input()
  item?: PjSideMenuItem;

  @Input()
  size: 'md' | 'lg' | 'xl' = 'lg';

  @Input()
  indentationLevel = -1;

  @Input()
  leaveIconRoom = false;

  @Output()
  itemClick = new EventEmitter<PjSideMenuItem>();

  offsetTop: number = -1;
  constructor(private _selfElm: ElementRef) {
  }

  ngOnInit(): void {
    this._childrenExpanded = this.item?.expanded || false;
  }

  ngAfterViewInit(): void {
    if (this.item?.focused) {
      this.offsetTop = this._selfElm.nativeElement.offsetTop;
    } else {
      if (this._allSubItems == null) {
        return;
      }
      let a = this._allSubItems.filter(i => isTrue(i.item?.focused));
      if (ArrayIsNotEmpty(a)) {
        this.offsetTop = a[0]._selfElm.nativeElement.offsetTop;
      }
    }
  }
  getIndentationClass(): string {
    switch (this.indentationLevel) {
      case 1:
        return 'ml-4';
      case 2:
        return 'ml-8';
      case 3:
        return 'ml-12';
      case 4:
        return 'ml-16';
      case 5:
        return 'ml-20';
    }
    return '';
  }
  hasIcon(): boolean {
    if (this.leaveIconRoom) {
      return true;
    }
    return this.item?.iconName != null && this.item.iconName.length > 0;
  }
  hideIcon(): string {
    if (!this.hasIcon()) {
      return '';
    }
    if (this.indentationLevel >= 0) {
      return 'invisible';
    } else if (this.item?.iconName == null || this.item.iconName.length <= 0) {
      return 'invisible';
    }
    return '';
  }
  getIconName(): string {
    if (this.item?.iconName != null && this.item.iconName.length > 0) {
      return this.item?.iconName;
    }
    return 'check_box_outline_blank';
  }
  hasBadge(): boolean {
    return this.item?.badge != null && this.item?.badge.length > 0
      ? true
      : false;
  }
  getMenuItemClass(): string {
    let menuItemClass =
      '' + this.size + ' ' + (this.item?.focused ? ' focused' : '');

    return menuItemClass;
  }
  showSubMenuIcon(): boolean {
    if (this._isGroup()) {
      return false;
    }
    return this.item?.children != null && this.item?.children.length > 0;
  }

  private _isItem(): boolean {
    return this.item?.type != null && this.item?.type == 'item';
  }

  isDivider(): boolean {
    return this.item?.type != null && this.item?.type == 'divider';
  }

  private _isGroup(): boolean {
    return this.item?.type != null && this.item?.type == 'group';
  }

  onClick(): void {
    if (
      this._isItem() &&
      this.item?.children != null &&
      this.item?.children.length > 0
    ) {
      this._childrenExpanded = !this._childrenExpanded;
    }
    if (!this.item?.focused) {
      this.itemClick.emit(this.item);
    }
  }

  private _childrenExpanded = false;
  isExpanded(): boolean {
    if (this._isGroup()) {
      if (this.item?.children != null && this.item?.children.length > 0) {
        return true;
      }
    }
    return this._childrenExpanded;
  }

  onItemClick(subItem: PjSideMenuItem): void {
    this.itemClick.emit(subItem);
  }

  getSubItemIconName(): string {
    return this._childrenExpanded ? 'expand_more' : 'chevron_right';
  }

  isNormalSideMenu(): boolean {
    return this.type === 'normal';
  }

  getIconSize(): number {
    switch (this.size) {
      case 'md':
        return 18;
      case 'lg':
        return 20;
      case 'xl':
        return 24;
    }
    return 20;
  }
}
