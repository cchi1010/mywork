import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { HasStringValue, PjKeyValue } from 'src/component/components.global';

@Component({
  selector: 'pj-reset-password',
  templateUrl: './pj-reset-password.component.html',
  styleUrls: ['./pj-reset-password.component.scss']
})
export class PjResetPasswordComponent  {

  @Output()
  passwordChange = new EventEmitter<string>();

  @Input()
  validateRules?: PjKeyValue<Array<ValidatorFn>>;

  constructor() { }

  getValidateRules(): PjKeyValue<Array<ValidatorFn>> {
    return this.validateRules || {};
  }

  getSubmitPassword(): boolean {
    return this._fetchNewPswd;
  }

  private _fetchNewPswd: boolean = false;
  onResetBtnClick(): void {
    this._fetchNewPswd = true;
  }

  onPasswordChanged(newPassword: string): void {
    timer(200).subscribe(() => {
      this._fetchNewPswd = false;
      if(HasStringValue(newPassword)) {
        this.passwordChange.emit(newPassword);
      }
    });
  }
}
