import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { NgFormValidator, PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-signin',
  templateUrl: './pj-signin.component.html',
  styleUrls: ['./pj-signin.component.scss'],
  host: { 'class': 'flex flex-col gap-4' }
})
export class PjSigninComponent implements OnChanges {

  @Input()
  brandLabel: string = '';

  @Input()
  passwordError: boolean = false;

  @Input()
  emailError: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @Input()
  validateRules?: Array<ValidatorFn> | ValidatorFn;

  private _showPasswordEntry: boolean = false;

  private _emailFormControl = new FormControl('', [NgFormValidator.email(), NgFormValidator.required()]);

  private _pswdFormControl = new FormControl('', NgFormValidator.required('Password is requied for signin.'));

  private _invalidValidator: ValidatorFn = NgFormValidator.invalidValidator('No PolarJ account was registered with this email.');

  constructor() { }

  ngOnInit(): void {
    this._emailFormControl.valueChanges.subscribe(() => this._emailFormControl.removeValidators(this._invalidValidator));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validateRules'] != null) {
      this._emailFormControl = new FormControl('', this.validateRules);
    }
    if (changes['brandLabel'] != null && changes['brandLabel'].firstChange) {
      this._invalidValidator = NgFormValidator.invalidValidator('No ' + this.brandLabel + ' account was registered with this email.');
    }
    if (changes['emailError'] != null) {
      if (this.emailError) {
        this._emailFormControl.addValidators(this._invalidValidator);
        this._emailFormControl.updateValueAndValidity();
      } else {
        this._emailFormControl.removeValidators(this._invalidValidator);
      }
    }
  }

  onSignupBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.SIGN_UP });
  }

  getEmailFormControl(): FormControl {
    return this._emailFormControl;
  }

  getPasswordFormControl(): FormControl {
    return this._pswdFormControl;
  }

  onLoginBtnClick(): void {
    if (!this._showPasswordEntry) {
      if (this._emailFormControl.invalid) {
        return;
      }
      this._showPasswordEntry = true;
    }
  }

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }

  getSigninTitle(): string {
    return 'Sign in to ' + this.brandLabel;
  }

  onForgetPasswordBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN_FORGET_PASSWORD, para: { loginName: this._emailFormControl.value || '' } });
  }

  getSigninBtnLabel(): string {
    return this._showPasswordEntry ? 'Sign in' : 'Continue';
  }

  isShownPasswordEntry(): boolean {
    return this._showPasswordEntry;
  }

  isPasswordEntry(): boolean {
    return this._showPasswordEntry;
  }
  onLoginCaptchaChanged(userverify: string): void {
    if (this._showPasswordEntry) {
      if (this._pswdFormControl.valid) {
        this.actionClick.emit({
          actionString: PJ_ACTION.LOGIN,
          para: { loginName: this._emailFormControl.value || '', password: this._pswdFormControl.value || '', captchaResp: userverify }
        });
      }
    } else {
      if (this._emailFormControl.invalid) {
        return;
      }
      this._showPasswordEntry = true;
    }
  }

  onCaptchaChanged(userverify: string): void {
    if (this._emailFormControl.invalid) {
      return;
    }
    this.actionClick.emit({
      actionString: PJ_ACTION.LOGIN_ONE_TIME_LINK,
      para: { loginName: this._emailFormControl.value || '', captchaResp: userverify }
    });
  }
}
