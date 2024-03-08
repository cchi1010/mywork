import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-password-reset-option',
  templateUrl: './pj-password-reset-option.component.html',
  styleUrls: ['./pj-password-reset-option.component.scss']
})
export class PjPasswordResetOptionComponent implements OnInit {

  @Output()
  actionClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onEmailResetBtnClick(): void {
    this.actionClick.emit(PJ_ACTION.PASSWORD_RESET_OPTION_EMAIL);
  }

  onPhoneResetBtnClick(): void {
    this.actionClick.emit(PJ_ACTION.PASSWORD_RESET_OPTION_PHONE);
  }

  onQuestionResetBtnClick(): void {
    this.actionClick.emit(PJ_ACTION.PASSWORD_RESET_OPTION_QUESTION);
  }

  onLoginBtnClick(): void {
    this.actionClick.emit(PJ_ACTION.LOGIN);
  }
}
