import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { ArrayIsNotEmpty, PjSideMenuItem, isTrue } from '../components.global';
import { PjSideMenuItemComponent } from './pj-side-menu-item/pj-side-menu-item.component';


@Component({
  selector: 'pj-side-menu',
  templateUrl: './pj-side-menu.component.html',
  styleUrls: ['./pj-side-menu.component.scss'],
  host: { class: 'flex flex-col' }
})
export class PjSideMenuComponent implements OnInit {

  @ViewChildren(PjSideMenuItemComponent)
  private _allItems?: QueryList<PjSideMenuItemComponent>;

  @Input()
  type: 'normal' | 'condensed' = 'normal'; // condensed: 只显示图标的靠边菜单

  @Input()
  items?: Array<PjSideMenuItem>;

  @Input()
  size: 'md' | 'lg' | 'xl' = 'lg';
  constructor(private _selfElm: ElementRef) { }

  ngAfterViewInit(): void {
    if (this._allItems == null) {
      return;
    }
    let a = this._allItems.filter(i => {
      let b = isTrue(i.item?.focused);
      if (!b && ArrayIsNotEmpty(i.item?.children)) {
        let aa = i.item?.children?.filter(ii => isTrue(ii.focused));
        if (ArrayIsNotEmpty(aa)) {
          b = true;
        }
      }
      return b;
    });
    if (ArrayIsNotEmpty(a)) {
      this._selfElm.nativeElement.scrollTo({ top: a[0].offsetTop - 200, behavior: 'smooth' });
    }
  }
  setComponentData(data: any): void {
    this.items = data.items;
  }

  private _itemChanged = new Subject<PjSideMenuItem>();
  event(): Subject<any> {
    return this._itemChanged;
  }

  @Output()
  itemChanged = new EventEmitter<PjSideMenuItem>();
  ngOnInit(): void {
  }

  onItemClick(item: PjSideMenuItem): void {
    this.items?.forEach(i => {
      this._clearFocusedFlag(i);
    });
    if (item.children == null || item.children.length == 0) {
      item.focused = true;
      if (item.actionString !== '') {
        this._itemChanged.next(item);
        this.itemChanged.emit(item);
      }
    }
  }

  private _clearFocusedFlag(item: PjSideMenuItem): void {
    item.focused = false;
    if (item.children == null || item.children.length == 0) {
      return;
    }
    item.children.forEach(item => {
      this._clearFocusedFlag(item);
    });
  }
  hasIcon(): boolean {
    let b = false;
    this.items?.forEach(item => {
      if (item.iconName != null && item.iconName.length > 0) {
        b = true;
      }
    });
    return b;
  }
}
