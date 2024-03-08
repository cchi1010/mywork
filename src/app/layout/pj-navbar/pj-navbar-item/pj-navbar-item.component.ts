import { Component, Input, OnInit } from '@angular/core';
import { PjNavbarItemData } from 'src/component/components.global';


@Component({
  selector: 'pj-navbar-item',
  templateUrl: './pj-navbar-item.component.html',
  styleUrls: ['./pj-navbar-item.component.scss']
})
export class PjNavbarItemComponent implements OnInit {

  @Input()
  item?: PjNavbarItemData;

  // @Input()
  // hasIcon: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getFocusedClass(item?: PjNavbarItemData): string {
    if (item?.actived) {
      return 'focused';
    }
    return '';
  }

  hasIcon(): boolean {
    return (this.item?.subs != null && this.item?.subs.length > 0);
  }
}
