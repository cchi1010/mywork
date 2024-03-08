import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from 'src/component/components.global';
import { PjCountdownDirective } from 'src/directive/pj-countdown.directive';

@Component({
  selector: 'pj-code-entry',
  templateUrl: './pj-code-entry.component.html',
  styleUrls: ['./pj-code-entry.component.scss'],
  host: { 'class': 'flex flex-col' }
})
export class PjCodeEntryComponent {

  @Input()
  brandLabel: string = '';

  @Input()
  loginEmail = '';

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @Output()
  codeChanged = new EventEmitter<string>();

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }
  onLoginBntClick(codes: Array<string>): void {
    this.codeChanged.emit(codes.join());
  }

  onChangeEmailBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_SWITCH_EMAIL });
  }

  onPasswordVerificationBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_PASSWORD_VERIFY });
  }

  onResendCodeBtnClick(): void {
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
}
