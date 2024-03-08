import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PJ_SIZE, PjDropdownItem } from 'src/component/components.global';
import { PjDropdownComponent } from './pj-dropdown/pj-dropdown.component';


@Component({
  selector: 'pj-dropdown-group',
  template: ``,
  styleUrls: [],
})
export class PjDropdownGroupComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  item?: PjDropdownItem;

  @Input()
  label?: string;

  @Input()
  menuItems = new Array<PjDropdownItem>();

  @Input()
  disabled = false;

  @Input()
  error = false;

  @Input()
  noSelection?: boolean;

  @Input()
  maxHeight?: number;

  @Input()
  disabledItemClickable: boolean = false;

  @Output()
  itemClicked = new EventEmitter<PjDropdownItem>();

  protected _dropdownType: string = 'menu';

  constructor() { }

  ngOnInit(): void {

  }

  getHeaderSize(): string {
    return this.pjSize || PJ_SIZE.MEDIUM;
  }

  getFocused(elm: PjDropdownComponent): boolean {
    return elm.opened.value;
  }

  showMenuItem(): boolean {
    const hasMenuItem =
      ((this.menuItems != null) && (this.menuItems.length > 0));
    return hasMenuItem;
  }

  getItemmSize(): string {
    return this.pjSize || PJ_SIZE.MEDIUM;
  }

  onItemClick(item: PjDropdownItem, elm?: PjDropdownComponent): void {
    this.itemClicked.emit(item);
  }

  hasHeader(): boolean {
    return this.item != null;
  }

  getDropdownType(): string {
    return this._dropdownType;
  }
}
