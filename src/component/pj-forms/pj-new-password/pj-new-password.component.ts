import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { PjKeyValue, PjProperty, HasStringValue, NgFormValidator, PjTextEntryData, isTrue } from 'src/component/components.global';


@Component({
  selector: 'pj-new-password',
  templateUrl: './pj-new-password.component.html',
  styleUrls: ['./pj-new-password.component.scss'],
  host: { 'class': 'flex flex-col gap-4' }
})
export class PjNewPasswordComponent implements OnInit {

  private _iconConfig: PjKeyValue<PjProperty> = {
    normal: { iconClass: 'neutral', iconName: 'circle' },
    error: { iconClass: 'error', iconName: 'priority_high' },
    warning: { iconClass: 'warn', iconName: 'warning_amber.outlined' },
    pass: { iconClass: 'success', iconName: 'check' },
  }
  private _pswdLimitation: PjKeyValue<any> = {
    lengthLimit: this._iconConfig['normal'],
    bothcase: this._iconConfig['normal'],
    number: this._iconConfig['normal'],
    specialchar: this._iconConfig['normal'],
  };

  private _passwordEntryConfig: PjTextEntryData = { label: 'New password', labelled: true, passwordEnabled: true };
  private _confirmEntryConfig: PjTextEntryData = { label: 'Confirm password', labelled: true, passwordEnabled: true };

  @Output()
  passwordChanged = new EventEmitter<string>();

  @Input()
  submitNewPassword: boolean = false;

  @Input()
  validateRules?: PjKeyValue<Array<ValidatorFn>>;

  @Input()
  confirmNeeded: boolean = true;

  @Input()
  oldPassword?: string;

  private _formGroup?: FormGroup;
  private invalidValidator = NgFormValidator.invalidValidator('New password must be different from the old one.');
  constructor() { }

  ngOnInit(): void {
    this._formGroup?.valueChanges.subscribe(value => {
      this._onPasswordChange(value['password'] || '');
      if (this._formGroup?.errors != null) {
        this._confirmEntryConfig.groupErrorMsg = this._formGroup.errors['errorMessage'];
      } else {
        this._confirmEntryConfig.groupErrorMsg = undefined;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validateRules'] != null && changes['validateRules'].currentValue != null) {
      this._formGroup = new FormGroup({
        'password': new FormControl('', this.validateRules!['password']),
        'confirmedPassword': new FormControl('', this.validateRules!['confirmedPassword'])
      }, { validators: this.validateRules!['passwordMatch'] });
    }

    if (changes['submitNewPassword'] != null && changes['submitNewPassword'].currentValue === true) {
      if (!HasStringValue(this._formGroup?.get('password')?.value)) {
        this._passwordEntryConfig.error = true;
        this._confirmEntryConfig.error = true;
        this._pswdLimitation['lengthLimit'] = this._iconConfig['error'];
        this._pswdLimitation['bothcase'] = this._iconConfig['error'];
        this._pswdLimitation['specialchar'] = this._iconConfig['error'];
        this._pswdLimitation['number'] = this._iconConfig['error'];
      } else if (!HasStringValue(this._formGroup?.get('confirmedPassword')?.value)) {
        if (this.confirmNeeded) {
          this._confirmEntryConfig.error = true;
        }
      } else if (this._passwordEntryConfig.error) {
        this._confirmEntryConfig.error = true;
      } else {
        if (this._formGroup?.invalid && this.confirmNeeded) {
          this._confirmEntryConfig.error = true;
        } else {
          this._confirmEntryConfig.error = false;
        }
      }
      if (!this._passwordEntryConfig.error && !this._confirmEntryConfig.error && isTrue(this._getCorrectFrm())) {
        this.passwordChanged.emit(this._formGroup?.get('password')!.value!);
      } else {
        this.passwordChanged.emit('');
      }
    }
  }
  getIconClass(limitField: string): string {
    return this._pswdLimitation[limitField].iconClass;
  }

  getIconName(limitField: string): string {
    return this._pswdLimitation[limitField].iconName;
  }

  private _getCorrectFrm(): boolean {
    return    this._pswdLimitation['lengthLimit'].iconClass == 'success' &&
      this._pswdLimitation['bothcase'].iconClass == 'success' &&
      this._pswdLimitation['number'].iconClass == 'success';
  }

  private _onPasswordChange(pswd: string): void {
    this._confirmEntryConfig.error = false;
    this._passwordEntryConfig.error = false;
    timer(150).subscribe(() => {
      if (!HasStringValue(pswd)) {
        this._pswdLimitation['lengthLimit'] = this._iconConfig['normal'];
        this._pswdLimitation['bothcase'] = this._iconConfig['normal'];
        this._pswdLimitation['specialchar'] = this._iconConfig['normal'];
        this._pswdLimitation['number'] = this._iconConfig['normal'];
        this._pswdStrongth = '';
        return;
      }
      // this._password = pswd;
      if (pswd.length < 6) {
        this._pswdLimitation['lengthLimit'] = this._iconConfig['error'];
      } else {
        this._pswdLimitation['lengthLimit'] = this._iconConfig['pass'];
      }
      if (pswd.match('[a-z]') != null && pswd.match('[A-Z]') != null) {
        this._pswdLimitation['bothcase'] = this._iconConfig['pass'];
      } else {
        this._pswdLimitation['bothcase'] = this._iconConfig['error'];
      }
      if (pswd.match('[0-9]') != null) {
        this._pswdLimitation['number'] = this._iconConfig['pass'];
      } else {
        this._pswdLimitation['number'] = this._iconConfig['error'];
      }
      if (pswd.match('[!@#$%\^&*()]') != null) {
        this._pswdLimitation['specialchar'] = this._iconConfig['pass'];
      } else {
        this._pswdLimitation['specialchar'] = this._iconConfig['warning'];
      }

      if (this._pswdLimitation['number'] == this._iconConfig['error']
        || this._pswdLimitation['bothcase'] == this._iconConfig['error']
        || this._pswdLimitation['lengthLimit'] == this._iconConfig['error']) {
        this._pswdStrongth = 'weak';
        this._passwordEntryConfig.error = true;
      } else {
        this._passwordEntryConfig.error = false;
        if (this._pswdLimitation['specialchar'] == this._iconConfig['warning']) {
          this._pswdStrongth = 'medium';
        } else {
          this._pswdStrongth = 'strong';
        }
      }
  
      if (pswd===this.oldPassword){
        this._passwordEntryConfig.error = true;
        this._formGroup?.get('password')!.addValidators(this.invalidValidator);
        this._formGroup?.get('password')!.updateValueAndValidity();
      }else{
        this._passwordEntryConfig.error = false;
        this._formGroup?.get('password')!.removeValidators(this.invalidValidator);
        this._formGroup?.get('password')!.updateValueAndValidity();
      }
    });
  }

  private _pswdStrongth: string = '';
  getProgress(): number {
    return this._pswdStrongthConfig[this._pswdStrongth]['progress'] as number;
  }

  getProgressClass(): string {
    return this._pswdStrongthConfig[this._pswdStrongth]['styleClass'] as string;
  }

  private _pswdStrongthConfig: PjKeyValue<PjKeyValue<string | number>> = {
    weak: { label: 'Weak', styleClass: 'error', progress: 33 },
    medium: { label: 'Medium', styleClass: 'warn', progress: 66 },
    strong: { label: 'Strong', styleClass: 'success', progress: 100 },
  }

  getPasswordStrengthClass(): string {
    return this._pswdStrongthConfig[this._pswdStrongth]['styleClass'] as string;
  }
  getPasswordStrength(): string {
    return this._pswdStrongthConfig[this._pswdStrongth]['label'] as string;
  }

  hasPswdStrongth(): boolean {
    return HasStringValue(this._pswdStrongth);
  }
  isConfirmPasswordError(): boolean {
    return (this._confirmEntryConfig.error == null) ? false : this._confirmEntryConfig.error;
  }
  getConfirmPasswordEntryConfig(): PjTextEntryData {
    return this._confirmEntryConfig;
  }
  getPasswordEntryConfig(): PjTextEntryData {
    return this._passwordEntryConfig;
  }

  getPasswordFormControl(): FormControl {
    return (this._formGroup?.get('password') as FormControl)!;
  }
  getConfirmedPasswordFormControl(): FormControl {
    return (this._formGroup?.get('confirmedPassword') as FormControl)!;
  }
}
