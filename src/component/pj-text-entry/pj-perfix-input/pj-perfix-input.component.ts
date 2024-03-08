
import { Component,  Input, OnInit, Output } from '@angular/core';
import { HasStringValue } from 'src/component/components.global';
import { PjTextEntryComponent } from 'src/component/pj-text-entry/pj-text-entry.component';

@Component({
  selector: 'pj-perfix-input',
  templateUrl: './pj-perfix-input.component.html',
  styleUrls: ['./pj-perfix-input.component.scss'],
  host: { class: 'relative' }
})
export class PjPerfixInputComponent extends PjTextEntryComponent {

  @Input()
  leftPerfixSign?: string
  @Input()
  rightPerfixSign?: string
  // @Input()
  // textEntryType: string='normal'

  hasLeftPerfixSign(): boolean {
    return HasStringValue(this.leftPerfixSign);
  }
  hasRightPerfixSign(): boolean {
    return HasStringValue(this.rightPerfixSign);
  }
  getLeftPerfixSign(): string {
    return this.leftPerfixSign || '';
  }
  getRightPerfixSign(): string {
    return this.rightPerfixSign || '';
  }
  getTextBoxType(): string {
    if (HasStringValue(this.leftPerfixSign)) {
      return 'leftType';
    }
    if (HasStringValue(this.rightPerfixSign)) {
      return 'rightType';
    }
    return '';
  }

  override getTextClass(): string {
    let c = this.entryConfig.focused ? 'focused' : '';
    if (HasStringValue(this.leftPerfixSign) && HasStringValue(this.rightPerfixSign)) {
      c = c + ' leftRightType';
    } else if (HasStringValue(this.leftPerfixSign)) {
      c = c + ' leftType';
    } else if (HasStringValue(this.rightPerfixSign)) {
      c = c + ' rightType';
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

}
