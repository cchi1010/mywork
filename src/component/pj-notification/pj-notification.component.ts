import { Component, Input, OnInit } from '@angular/core';
import { PjAction, PJ_COMPONENT_STYLE } from '../components.global';

@Component({
  selector: 'pj-notification',
  templateUrl: './pj-notification.component.html',
  styleUrls: ['./pj-notification.component.scss'],
})
export class PjNotificationComponent implements OnInit {
  @Input()
  iconName = '';

  @Input()
  title = '';

  @Input()
  description = '';

  @Input()
  actionLabel = '';

  @Input()
  actions?: Array<PjAction>;

  constructor() {}

  ngOnInit(): void {}

  hasIcon(): boolean {
    return ((this.iconName != null) && (this.iconName.length > 0));
  }

  hasAction(): boolean {
    return ((this.actionLabel != null) && (this.actionLabel.length > 0));
  }

  hasDescription(): boolean {
    return ((this.description != null) && (this.description.length > 0));
  }
}
