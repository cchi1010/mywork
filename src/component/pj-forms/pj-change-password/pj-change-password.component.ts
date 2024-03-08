import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { timer } from 'rxjs';
import { HasStringValue, NgFormValidator, PjActionEvent, PjKeyValue, PJ_ACTION, PjTextEntryData } from 'src/component/components.global';


@Component({
  selector: 'pj-change-password',
  templateUrl: './pj-change-password.component.html',
  styleUrls: ['./pj-change-password.component.scss'],
  host: { 'class': 'flex flex-col items-center gap-4' }
})
export class PjChangePasswordComponent implements OnChanges {

  @Input()
  incorrectPswd: boolean = false;

  @Input()
  validateRules?: PjKeyValue<Array<ValidatorFn>>;

  private _formControl = new FormControl('');

  private _fetchNewPswd: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  private invalidValidator = NgFormValidator.invalidValidator('Incorrect Password.');
  constructor() { }

  ngOnInit(): void {
    this._formControl.valueChanges.subscribe(() => this._formControl.removeValidators(this.invalidValidator));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incorrectPswd'] != null) {
      if (this.incorrectPswd) {
        this._formControl.addValidators(this.invalidValidator);
        this._formControl.updateValueAndValidity();
      } else {
        this._formControl.removeValidators(this.invalidValidator);
      }
    }
    if (changes['validateRules'] != null &&
      changes['validateRules'].currentValue != null &&
      this.validateRules!['oldPassword'] != null) {
      this._formControl.addValidators(this.validateRules!['oldPassword']);
    }
  }

  onCancelBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CANCEL });
  }

  getFormControl(): FormControl {
    return this._formControl;
  }
  onSaveBtnClick(): void {
    if (this._formControl.invalid) {
      this._formControl.markAsDirty();
    }
    this._fetchNewPswd = true;
  }

  getSubmitPassword(): boolean {
    return this._fetchNewPswd;
  }

  onPasswordChanged(newPassword: string): void {
    timer(200).subscribe(() => {
      this._fetchNewPswd = false
      if (HasStringValue(newPassword) && HasStringValue(this._formControl.value)) {
        this.actionClick.emit({
          actionString: PJ_ACTION.SAVE,
          para: {
            oldPassword: this._formControl.value,
            newPassword: newPassword
          }
        });
      }
    });
  }

  getValidateRules(): PjKeyValue<Array<ValidatorFn>> {
    return this.validateRules || {};
  }

  getOldPasswordEntryConfig(): PjTextEntryData {
    return {
      passwordEnabled: true, label: 'Old Password',
      labelled: true,
    };
  }
  getOldPassword():string{
    return this._formControl.value||'';
  }
}
