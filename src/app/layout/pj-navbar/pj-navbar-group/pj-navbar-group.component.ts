import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PjNavbarGroupData, PjNavbarItemData } from 'src/component/components.global';

@Component({
  selector: 'pj-navbar-group',
  templateUrl: './pj-navbar-group.component.html',
  styleUrls: ['./pj-navbar-group.component.scss']
})
export class PjNavbarGroupComponent implements OnInit {

  @Input()
  groupData?: PjNavbarGroupData;

  @Output()
  itemClicked = new EventEmitter<PjNavbarItemData>();
  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: PjNavbarItemData): void {
    item.groupId = this.groupData?.groupId;
    this.itemClicked.emit(item);
  }
}
