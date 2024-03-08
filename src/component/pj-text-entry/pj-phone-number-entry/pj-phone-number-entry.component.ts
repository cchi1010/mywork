import { Component, Input, OnInit } from '@angular/core';
import { PjTextEntryComponent } from '../pj-text-entry.component';
import { HasStringValue, NgFormValidator } from 'src/component/components.global';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'pj-phone-number-entry',
  templateUrl: './pj-phone-number-entry.component.html',
  styleUrls: ['./pj-phone-number-entry.component.scss']
})
export class PjPhoneNumberEntryComponent extends PjTextEntryComponent {

  @Input()
  leftPerfixSign?: string


  hasLeftPerfixSign(): boolean {
    return HasStringValue(this.leftPerfixSign);
  }

  getLeftPerfixSign(): string {
    return this.leftPerfixSign || '';
  }

  getTextBoxType(): string {
    if (HasStringValue(this.leftPerfixSign)) {
      return 'leftType';
    }
    return '';
  }

  override getTextClass(): string {
    let c = this.entryConfig.focused ? 'focused' : '';
    if (HasStringValue(this.leftPerfixSign)) {
      c = c + ' leftType';
    } 
    if (this.formControl?.value?.length > 0) {
      c = c + ' filled';
    }
    if (this.entryConfig.disabled) {
      c = c + ' disabled';
    }
    if (this.hasErrorMsg()||this.entryConfig.error) {
      c = c + ' error';
    }
    if (this.textEntryType == 'noborder'){
      c = c + ' noborder';
    } else{
      c = c + ' normal';
    }
    if(this.noInput) {
      c = c + ' notInput';
    }
    return c;
  }

}