import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HasStringValue, isTrue, PjProperty, PJ_SIZE, isFalse, PjTextEntryData, NgFormTool } from '../components.global';


@Component({
  selector: 'pj-text-entry',
  templateUrl: './pj-text-entry.component.html',
  styleUrls: ['./pj-text-entry.component.scss'],
})
export class PjTextEntryComponent implements OnInit {

  @Input()
  entryConfig: PjTextEntryData = {
    labelled: false, label: '', disabled: false,
    focused: false, passwordEnabled: false
  };

  @Input()
  formControl?: FormControl;

  @Input()
  pjSize?: string;

  @Input()
  noInput?: boolean;

  @Input()
  textEntryType: string='normal';

  @Input()
  onDate: boolean = false;

  @Input()
  onCard?: boolean;

  @Output()
  enterKeyPressed = new EventEmitter<string>();

  @Output()
  valueChange = new EventEmitter<string>();


  private _innerLabelled: boolean = false;

  private _showPassword: boolean = false;

  private _inputFormControl: FormControl = new FormControl('');
  constructor() { }

  ngOnInit(): void {
    if (this.pjSize == PJ_SIZE.EXTRA_LARGE) {
      this._innerLabelled = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formControl'] != null && this.formControl != null) {
      this._inputFormControl = this.formControl;
    }
    if (this.entryConfig.labelled == null) {
      this.entryConfig.labelled = false;
    }
    if (this.entryConfig.label == null) {
      this.entryConfig.label = '';
    }
    if (this.entryConfig.disabled == null) {
      this.entryConfig.disabled = false;
    }
    if (this.entryConfig.focused == null) {
      this.entryConfig.focused = false;
    }
    if (this.entryConfig.passwordEnabled == null) {
      this.entryConfig.passwordEnabled = false;
    }
  }

  getFormControl(): FormControl {
    return this._inputFormControl;
  }

  getTextType(): string {
    return this.entryConfig.passwordEnabled && !this._showPassword ? 'password' : 'text';
  }
  hasLabel(elm?: HTMLInputElement): boolean {
    if (this.entryConfig.focused && elm != null && !this.entryConfig.disabled) {
      elm?.focus();
    }
    return this.entryConfig.labelled! && HasStringValue(this.entryConfig.label);
  }
  hasInnerLabel(): boolean {
    return this._innerLabelled && !this.entryConfig.labelled;
  }
  getLabel(): string {
    return this.entryConfig.label || '';
  }

  hasAssistiveText(): boolean {
    return HasStringValue(this.entryConfig.assistiveText) && !this.hasErrorMsg();
  }

  getAssistiveText(): string {
    return this.entryConfig.assistiveText || '';
  }

  getErrorIconClass(): string {
    if (!this.entryConfig.focused && this._inputFormControl.dirty && this._inputFormControl.invalid) {
      return 'visible';
    }
    return 'invisible';
  }

  hasShowPasswordBtn(): boolean {
    if (HasStringValue(this.formControl?.value)) {
      return this.entryConfig.passwordEnabled || false;
    }
    return false;
  }

  onShowPasswordBtnClick(event: Event): void {
    event.stopPropagation();
    this._showPassword = !this._showPassword;
  }

  getShowPasswordIconName(): string {
    return this._showPassword ? 'visibility_off' : 'visibility';
  }

  onInputFocus(elm?: HTMLInputElement): void {
    this.entryConfig.focused = true;
    this._inputFormControl.markAsDirty();
    if (elm != null && !this.entryConfig.disabled) {
      elm.focus();
      elm.select();
    }
  }

  onInputFocuseOut(): void {
    if (this.formControl?.value) {
      this.formControl.setValue(NgFormTool.toCDB(this.formControl?.value));
    }
    this.entryConfig.focused = false;
  }

  onEnterKeyPress(): void {
    this.entryConfig.focused = false;
    if (isTrue(this.formControl?.valid)&&this.formControl?.value) {
      this.formControl.setValue(NgFormTool.toCDB(this.formControl?.value));
      this.enterKeyPressed.emit(this.formControl?.value);
    }
  }
  onKeyDown():void{
    this.valueChange.emit(this.formControl?.value);
  }

  onKeyUp(e: any): void {
    if(this.onDate) {
      if(isFalse(this.onCard)) {
        if(e.key != 'Backspace' && (this.formControl?.value.length == 2 || this.formControl?.value.length == 5)) {
          this.formControl.setValue(this.formControl.value + '/');
        }
        if(e.key == 'Backspace' && (this.formControl?.value.length == 3 || this.formControl?.value.length == 6)) {
          this.formControl.setValue(this.formControl.value.slice(0, -1));
        }
      } else {
        if(e.key != 'Backspace' && this.formControl?.value.length == 2) {
          this.formControl.setValue(this.formControl.value + '/');
        }
        if(e.key == 'Backspace' && this.formControl?.value.length == 3) {
          this.formControl.setValue(this.formControl.value.slice(0, -1));
        }
      }
    }
  }

  getDisableClass(): string {
    return this.entryConfig.disabled ? 'disabled' : '';
  }
  getTextClass(): string {
    let c = this.entryConfig.focused ? 'focused' : '';
    if (this.formControl?.value?.length > 0) {
      c = c + ' filled';
    }
    if (this.entryConfig.disabled) {
      c = c + ' disabled';
    }
    if (this.hasErrorMsg()||this.entryConfig.error) {
      c = c + ' error';
    } 
    if (this.textEntryType=='noborder'){
      c=c+' noborder';
    }else{
      c=c+' normal';
    }
    if(this.noInput) {
      c = c + ' notInput';
    }
    return c;
  }

  getPaddingX(): PjProperty {
    let s: PjProperty = {};
    if (this.entryConfig.leftPadding != null) {
      s['padding-left'] = this.entryConfig.leftPadding + 'px';
    }
    if (this.entryConfig.rightPadding != null) {
      s['padding-right'] = this.entryConfig.rightPadding + 'px';
    }
    return s;
  }
  getAssistiveTextClass(): string {
    let c = this.getTextClass();
    if (!this.hasLabel()) {
      c = c + ' ' + this.pjSize;
    }
    return c;
  }

  getPlaceholder(): string {
    return this.entryConfig.placeholder || '';
  }

  hasErrorMsg(): boolean {
    return (
      !isTrue(this.entryConfig.focused) &&
      isTrue(this.formControl?.dirty) &&
      (
        isTrue(this.formControl?.invalid) ||
        HasStringValue(this.entryConfig.groupErrorMsg)
      )
    );
  }

  getErrorMsg(): string {
    if (this.formControl?.errors != null) {
      return this.formControl?.errors['errorMessage'];
    }
    if (HasStringValue(this.entryConfig.groupErrorMsg)) {
      return this.entryConfig.groupErrorMsg!
    }
    return '';
  }

  getErrorMsgClass(): string {
    return this.getAssistiveTextClass() + ' error';
  }

  getMaxLength(): number {
    return this.entryConfig.maxLength || 65535;
  }
}
