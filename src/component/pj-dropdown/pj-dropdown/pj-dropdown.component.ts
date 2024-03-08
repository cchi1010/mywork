import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrayIsNotEmpty, HasStringValue, PJ_SIZE, PjDropdownItem } from 'src/component/components.global';
import { PjDropdownBoxComponent } from '../pj-dropdown-box/pj-dropdown-box.component';


@Component({
  selector: 'pj-dropdown',
  templateUrl: './pj-dropdown.component.html',
  styleUrls: [],
})
export class PjDropdownComponent implements OnInit {

  @ViewChild('dropdownBox')
  private _dropdownBox?: PjDropdownBoxComponent;

  @Input()
  pjSize?: string;

  opened = new BehaviorSubject<boolean>(false);

  openedBy?: HTMLDivElement;

  @Input()
  menuItems = new Array<PjDropdownItem>();

  @Output()
  itemClicked = new EventEmitter<PjDropdownItem>();

  @Input()
  horizontalAlign?: 'right' | 'left';

  @Input()
  dropdownType?: string = 'menu';

  @Input()
  maxHeight?: number;

  @Input()
  disabledItemClickable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  hasItems(): boolean {
    return this.menuItems.length > 0 ? true : false;
  }
  ngOnChanges(): void {
    if (!ArrayIsNotEmpty(this.menuItems)) {
      return;
    }
    if (this.dropdownType !== 'option') {
      return;
    }
    this.menuItems?.forEach(item => {
      item.toggleable = true;
      if (item.selected == null) {
        item.selected = false
      }
    });
  }

  ngAfterViewInit(): void {
    if (this._dropdownBox != null) {
      this._dropdownBox.openedBy = this.openedBy;
      this.opened.subscribe(v => this._dropdownBox!.opened.next(v));
    }
  }

  onItemClick(item: PjDropdownItem): void {
    if (item.toggleable) {
      if (HasStringValue(item.groupName)) {
        // 在一个组内只能选择一个数值
        let oldValue = item.selected;
        this.menuItems.forEach(mi => {
          if (mi.groupName === item.groupName) {
            mi.selected = false;
          }
        });
        if (item.groupMadatory === true) {
          item.selected = true;
        } else {
          item.selected = !oldValue;
        }
      } else {
        item.selected = !item.selected;
      }
    }
    this._dropdownBox!.opened.next(false);
    this.itemClicked.emit(item);
  }

  getItemSize(): string {
    return this.pjSize || PJ_SIZE.MEDIUM;
  }
}
