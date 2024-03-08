import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { NgFormValidator, PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-email-entry',
  templateUrl: './pj-email-entry.component.html',
  styleUrls: ['./pj-email-entry.component.scss'],
  host: { 'class': 'flex flex-col gap-4' }
})
export class PjEmailEntryComponent implements OnChanges {

  @Input()
  brandLabel: string = '';

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @Output()
  emailChanged = new EventEmitter<string>();

  @Input()
  validateRules?: Array<ValidatorFn> | ValidatorFn;

  private _formControl = new FormControl('', [NgFormValidator.email(), NgFormValidator.required()]);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validateRules'] != null) {
      this._formControl = new FormControl('', this.validateRules);
    }
  }

  onSignupBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.SIGN_UP });
  }

  getFormControl(): FormControl {
    return this._formControl;
  }
  onLoginBtnClick(): void {
    if (this._formControl.invalid) {
      return;
    }
    this.emailChanged.emit(this._formControl.value || '');
  }

  onTermNoticeAction(actionEvent: PjActionEvent): void {
    this.actionClick.emit(actionEvent);
  }
}
