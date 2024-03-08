import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PJ_CARD_TYPE } from 'src/app/app.constant';
import { HasStringValue, PjPaymentInfo, PJ_SIZE, PjImageData, PjImageTypeConst, PjTextEntryData } from 'src/component/components.global';


@Component({
  selector: 'pj-card-number-entry',
  templateUrl: './pj-card-number-entry.component.html',
  styleUrls: ['./pj-card-number-entry.component.scss'],
  host: { class: 'relative' }
})
export class PjCardNumberEntryComponent implements OnInit {

  @Input()
  pjSize: string = PJ_SIZE.MEDIUM;

  @Input()
  formControl?: FormControl;

  @Input()
  noCardNum?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getCardEntryConfig(): PjTextEntryData {
    if (this.pjSize === PJ_SIZE.MEDIUM) {
      this._cardEntryConfig.leftPadding = 36;
    } else if (this.pjSize === PJ_SIZE.LARGE) {
      this._cardEntryConfig.leftPadding = 44;
    } else if (this.pjSize === PJ_SIZE.EXTRA_LARGE) {
      this._cardEntryConfig.leftPadding = 60;
    }
    return this._cardEntryConfig;
  }

  isCardTypeDetected(): boolean {
    if (!HasStringValue(this.formControl?.value)) {
      return false;
    }
    let cardType = PjPaymentInfo.generateCardType(this.formControl?.value!);
    if (cardType === PJ_CARD_TYPE.UNKNOW) {
      return false;
    }
    this._cardImageData.imageSrc = PjPaymentInfo.fetchTransparentBorderlessImage(cardType.toLowerCase());
    return true;
  }

  getCardImageData(): PjImageData {
    return this._cardImageData;
  }

  getFormControl(): FormControl | undefined{
    return this.formControl;
  }
  private _cardImageData: PjImageData = { width: 34, height: 24, imageType: PjImageTypeConst.RECTANGLE, noMouseEffection: true };
  private _cardEntryConfig: PjTextEntryData = { labelled: true, label: 'Card Number', placeholder: '**** **** **** ****', leftPadding: 36, ignoreBlank: true, maxLength: 19 };
}
