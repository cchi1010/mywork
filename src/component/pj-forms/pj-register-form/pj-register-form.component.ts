import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { HasStringValue, NgFormValidator, PjActionEvent, PjKeyValue, PJ_ACTION, isFalse, PjTextEntryData } from 'src/component/components.global';

@Component({
  selector: 'pj-register-form',
  templateUrl: './pj-register-form.component.html',
  styleUrls: ['./pj-register-form.component.scss'],
  host: { 'class': 'flex flex-col' }
})
export class PjRegisterFormComponent implements OnInit {

  @Input()
  brandLabel: string = 'PolarJ';

  @Input()
  onSeller: boolean = false;

  @Input()
  validateRules?: PjKeyValue<Array<ValidatorFn>>;

  @Input()
  emailError: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  registerInfoEntryConfig: PjKeyValue<PjTextEntryData> = {
    nickName: { label: 'Name', labelled: true },
    emailAddress: { label: 'Email', labelled: true },
    password: { label: 'Password', labelled: true, passwordEnabled: true },
  };

  private _nickNameFormControl = new FormControl('', NgFormValidator.required('Nick name is required.'));

  private _emailFormControl = new FormControl('');

  private _captchaResp?: string;

  private invalidValidator = NgFormValidator.invalidValidator('Email already in use. Enter a different email.');
  constructor() { }

  ngOnInit(): void {
    this._emailFormControl.valueChanges.subscribe(() => this._emailFormControl.removeValidators(this.invalidValidator));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validateRules'] != null &&
      changes['validateRules'].currentValue != null &&
      this.validateRules!['loginName'] != null
    ) {
      this._emailFormControl.addValidators(this.validateRules!['loginName']);
    }
    if (changes['emailError'] != null) {
      if (this.emailError) {
        this._emailFormControl.addValidators(this.invalidValidator);
        this._emailFormControl.updateValueAndValidity();
      }
    }
  }

  onRegisterSeller(): boolean {
    return this.onSeller;
  }

  getValidateRules(): PjKeyValue<Array<ValidatorFn>> {
    return this.validateRules || {};
  }
  onSignInBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.LOGIN });
  }

  getSubmitPassword(): boolean {
    return this._fetchNewPswd;
  }

  private _fetchNewPswd: boolean = false;
  onPasswordChanged(newPassword: string): void {
    timer(200).subscribe(() => this._fetchNewPswd = false);
    if (!HasStringValue(newPassword)) {
      return;
    }
    if (this._emailFormControl.invalid) {
      return;
    }
    // if (this._nickNameFormControl.invalid) {
    //   return;
    // }
    if(isFalse(this.onSeller)) {
      if(this._nickNameFormControl.invalid) {
        return;
      }
    }
    if (this._captchaResp == null) {
      return;
    }
    this.actionClick.emit({
      actionString: PJ_ACTION.CREATION,
      para: {
        useraccount: {
          nickName: this._nickNameFormControl.value,
          loginName: this._emailFormControl.value,
          password: newPassword,
        },
        captchaResp: this._captchaResp
      }
    });
  }

  getCreateLabel(): string {
    if(this.onSeller) {
      return 'Create my seller account';
    }
    return 'Create my shopping account';
  }

  onCreateAccountBtnClick(userverify: string): void {
    if (userverify == null) {
      this._captchaResp = undefined;
    } else {
      this._captchaResp = userverify;
    }
    this._fetchNewPswd = true;
  }

  getEntryConfig(fName: string): PjTextEntryData {
    return this.registerInfoEntryConfig[fName];
  }

  getNickFormControl(): FormControl {
    return this._nickNameFormControl;
  }

  getEmailFormControl(): FormControl {
    return this._emailFormControl;
  }
  getBrandName(): string {
    return this.brandLabel;
  }

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }

  isCaptchaError(): boolean {
    return false;
  }
}
