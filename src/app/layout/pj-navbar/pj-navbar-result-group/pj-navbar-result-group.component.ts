import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjNavbarItemData } from 'src/component/components.global';

@Component({
  selector: 'pj-navbar-result-group',
  templateUrl: './pj-navbar-result-group.component.html',
  styleUrls: ['./pj-navbar-result-group.component.scss']
})
export class PjNavbarResultGroupComponent implements OnInit {

  @Input()
  item?: PjNavbarItemData;

  @Input()
  keyword?: string;

  @Output()
  itemClicked = new EventEmitter<PjNavbarItemData>();

  constructor() { }

  ngOnInit(): void {
  }

  getFocusedClass(item?: PjNavbarItemData): string {
    if (item?.actived) {
      return 'focused';
    }
    return '';
  }

  getKeyword(): string {
    return this.keyword || '';
  }

  getCateLabel(item?: PjNavbarItemData): string {
    if(item == null) {
      return this.item?.title || '';
    }
    return item?.title || '';
  }

  getItems(): Array<PjNavbarItemData> {
    return this.item?.subs || [];
  }

  onItemClick(item: PjNavbarItemData): void {
    // item.groupId = this.groupData?.groupId;
    this.itemClicked.emit(item);
  }
}
