import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from 'src/component/components.global';
import { PjCountdownDirective } from 'src/directive/pj-countdown.directive';

@Component({
  selector: 'pj-phone-verification',
  templateUrl: './pj-phone-verification.component.html',
  styleUrls: ['./pj-phone-verification.component.scss'],
  host: { 'class': 'flex flex-col' }
})
export class PjPhoneVerificationComponent {
  @Input()
  brandLabel: string = '';

  @Input()
  loginEmail = '';

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  onContinueResetBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_CONTINUE_RESET_PASSWORD });
  }

  onResendBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_RESEND_CODE });
  }

  @ViewChild(PjCountdownDirective)
  protected _countdownElm?: PjCountdownDirective;

  getCountdownLabel(): string {
    return this._countdownElm?.getLabel() || '';
  }

  isResendDisabled(): boolean {
    if (this._countdownElm == null) {
      return true;
    }
    return !this._countdownElm.countdownFinish();
  }

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }
}
