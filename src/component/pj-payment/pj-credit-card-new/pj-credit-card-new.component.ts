import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFormValidator, PjPaymentInfo } from 'src/component/components.global';
import { PjCreditCardEditBase } from '../pj-credit-card-edit';

@Component({
  selector: 'pj-credit-card-new',
  templateUrl: './pj-credit-card-new.component.html',
  styleUrls: ['./pj-credit-card-new.component.scss'],
})
export class PjCreditCardNewComponent extends PjCreditCardEditBase implements OnChanges {
  @Input()
  title: string = 'PolarJ';

  @Input()
  acceptedCardNames?: Array<string>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validRules'] != null) {
      if (this.validRules == null) {
        this.validRules = {};
      }
      this._creditFrmGrp = PjPaymentInfo.generateNgFormGroup(this.validRules, new PjPaymentInfo());
      this.yearSelected();
      this._creditFrmGrp.valueChanges.subscribe(value => {
        if (this._creditFrmGrp?.valid) {
          this.cardInfoChange.emit(value);
        }
      });
    }
  }

  cardNumberChanged(number: string): void {
    this._creditFrmGrp!.get('idNumber')?.setValue(number);
    this.cardInfoChange.emit(this._creditFrmGrp?.getRawValue());
  }
}
