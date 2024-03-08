import { Component, Input, OnChanges } from '@angular/core';
import { PjPaymentInfo } from 'src/component/components.global';
import { PjCreditCardEditBase } from '../pj-credit-card-edit';

@Component({
  selector: 'pj-credit-card-edit',
  templateUrl: './pj-credit-card-edit.component.html',
  styleUrls: ['./pj-credit-card-edit.component.scss']
})
export class PjCreditCardEditComponent extends PjCreditCardEditBase implements OnChanges {

  @Input()
  creditInfo?: PjPaymentInfo;

  ngOnChanges(): void {
    if (this.validRules != null && this.creditInfo != null) {
      this._creditFrmGrp = PjPaymentInfo.generateNgFormGroup(this.validRules, this.creditInfo);
    }
  }

}
