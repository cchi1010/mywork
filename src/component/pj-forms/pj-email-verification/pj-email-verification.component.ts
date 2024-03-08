import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { isTrue, PjActionEvent, PJ_ACTION } from 'src/component/components.global';
import { PjCountdownDirective } from 'src/directive/pj-countdown.directive';

@Component({
  selector: 'pj-email-verification',
  templateUrl: './pj-email-verification.component.html',
  styleUrls: ['./pj-email-verification.component.scss'],
  host: { 'class': 'flex flex-col' }
})
export class PjEmailVerificationComponent {
  @Input()
  brandLabel: string = '';

  @Input()
  loginEmail = '';

  @Input()
  error?: boolean;

  private _verificationCode?: string;
  @Output()
  actionClick = new EventEmitter<PjActionEvent>();


  hasError(): boolean {
    return isTrue(this.error);
  }
  onValueChanged(vc: string): void {
    this._verificationCode = vc;
  }
  onCreateBtnClick(): void {
    if(this._verificationCode?.length != 6) {
      this.error = true;
    } else {
      this.actionClick.emit({ actionString: PJ_ACTION.VERIFICATION, para: { verificationCode: this._verificationCode } });
    }
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
