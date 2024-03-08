import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  HasStringValue,
  PjAction,
  PjActionEvent,
  PjProperty,
  PJ_ACTION,
  PJ_COMPONENT_STYLE, 
  PjAlertData
} from 'src/component/components.global';


@Component({
  selector: 'pj-alert',
  templateUrl: './pj-alert.component.html',
  styleUrls: ['./pj-alert.component.scss'],
})
export class PjAlertComponent implements OnInit {
  @Input()
  pjColor?: string;

  @Input()
  alertData?: PjAlertData;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  private _iconName?: string;
  private _style?: string;
  constructor() { }

  ngOnInit(): void {
    this._iconName = this._iconNames[this.pjColor || PJ_COMPONENT_STYLE.SUCCESS];
    this._style = (this.pjColor || PJ_COMPONENT_STYLE.SUCCESS);
  }

  private _iconNames: PjProperty = {
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
    info: 'info',
  };



  hasIconName(): boolean {
    return HasStringValue(this._iconName);
  }
  getIconName(): string {
    return this._iconName || '';
  }
  hasDescription(): boolean {
    return HasStringValue(this.alertData?.descriptions);
  }

  hasAction(): boolean {
    if (this._style == null) {
      return false;
    }
    return this.alertData?.actions == null ||
      this.alertData?.actions.length == 0
      ? false
      : true;
  }

  getActions(): Array<PjAction> {
    return this.alertData?.actions || [];
  }
  hasLink(): boolean {
    if (this._style == null) {
      return false;
    }
    return this.alertData?.linkAction == null ||
      this.alertData?.linkAction.label == null
      ? false
      : true;
  }

  singleDescription(): boolean {
    return this.alertData?.descriptions != null &&
      this.alertData?.descriptions.length == 1
      ? true
      : false;
  }

  getDescription(): string {
    if (
      this.alertData?.descriptions != null &&
      this.alertData?.descriptions.length > 0
    ) {
      return this.alertData?.descriptions[0];
    }
    return '';
  }

  getDescriptions(): Array<string> {
    return this.alertData?.descriptions || [];
  }
  getColor(): string {
    return this._style || '';
  }

  isCloseable(): boolean {
    return this.alertData?.closeable==true ;
  }

  onCloseClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
  }

  onActionBtnClick(action: PjAction): void {
    this.actionClick.emit({ actionString: action.actionString });
  }
}
