import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PJ_LINK_TYPE } from '../components.global';

@Component({
  selector: 'pj-link',
  templateUrl: './pj-link.component.html',
  styleUrls: ['./pj-link.component.scss'],
})
export class PjLinkComponent implements OnInit {
  @Input()
  type = PJ_LINK_TYPE.CONTENT; // 组件设计中的类型

  @Input()
  leftIconName = '';

  @Input()
  rightIconName = '';

  @Input()
  label = '';

  constructor() {}

  ngOnInit(): void {}

  hasLeftIcon(): boolean {
    return HasStringValue(this.leftIconName);
  }

  hasRightIcon(): boolean {
    return HasStringValue(this.rightIconName);
  }
}
