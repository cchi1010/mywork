import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { NgFormValidator, PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-password-entry',
  templateUrl: './pj-password-entry.component.html',
  styleUrls: ['./pj-password-entry.component.scss'],
  host: { 'class': 'flex flex-col gap-2' }
})
export class PjPasswordEntryComponent implements OnChanges {

  @Input()
  brandLabel: string = '';

  @Input()
  loginEmail = '';

  @Input()
  passwordError: boolean = false;

  @Input()
  validatorRules?: Array<ValidatorFn> | ValidatorFn;

  @Input()
  savedLocally: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @Output()
  passwordChanged = new EventEmitter<string>();

  private _formControl = new FormControl('', NgFormValidator.required());

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validatorRules'] != null) {
      this._formControl = new FormControl('', this.validatorRules);
    }
  }
  getLoginName(): string {
    return this.loginEmail;
  }
  onChangeEmailBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_SWITCH_EMAIL });
  }

  onEmailVerificationBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_EMAIL_VERIFY });
  }

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }
  onLoginBtnClick(): void {
    if (this._formControl.valid) {
      this.passwordChanged.emit(this._formControl.value || '');
    }
  }

  onResetPasswordBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_FORGET_PASSWORD });
  }

  getFormControl(): FormControl {
    return this._formControl;
  }
}
