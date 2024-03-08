import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { NgFormValidator, PjActionEvent, PJ_ACTION } from 'src/component/components.global';
import { PjButtonCtaComponent } from 'src/component/pj-button/pj-button-cta/pj-button-cta.component';

@Component({
  selector: 'pj-password-resetbyemail',
  templateUrl: './pj-password-resetbyemail.component.html',
  styleUrls: ['./pj-password-resetbyemail.component.scss'],
  host: { 'class': 'flex flex-col gap-12' }
})
export class PjPasswordResetbyemailComponent {

  @Input()
  emailError: boolean = false;

  @Input()
  captchaError: boolean = false;

  @Input()
  brandLabel?: string;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  private _emailFormControl = new FormControl('', [NgFormValidator.email(), NgFormValidator.required()]);
  private _invalidValidator: ValidatorFn = NgFormValidator.invalidValidator('No PolarJ account was registered with this email.');

  constructor() { }

  ngOnInit(): void {
    this._emailFormControl.valueChanges.subscribe(() => this._emailFormControl.removeValidators(this._invalidValidator));
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  onEnterKeyPressed(btn: PjButtonCtaComponent): void {
    
  }
  onContinueBtnClick(userverify: string): void {
    if (this._emailFormControl.valid) {
      this.actionClick.emit({
        actionString: PJ_ACTION.PASSWORD_RESET_OPTION_EMAIL,
        para: { loginName: this._emailFormControl.value || '', captchaResp: userverify }
      });
    }
  }

  getEmailFormControl(): FormControl {
    return this._emailFormControl;
  }

  isCaptchaError(): boolean {
    return this.captchaError;
  }
}
