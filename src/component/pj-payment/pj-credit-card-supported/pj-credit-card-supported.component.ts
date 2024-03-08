import { Component, Input, OnInit } from '@angular/core';
import { PjImageData, PjPaymentInfo } from 'src/component/components.global';

@Component({
  selector: 'pj-credit-card-supported',
  templateUrl: './pj-credit-card-supported.component.html',
  styleUrls: ['./pj-credit-card-supported.component.scss'],
})
export class PjCreditCardSupportedComponent implements OnInit {
  @Input()
  title: string = 'PolarJ';

  @Input()
  acceptedCardNames?: Array<string>;

  constructor() {}

  ngOnInit(): void {}

  getCardImage(cardName: string): PjImageData {
    const imageSrc = PjPaymentInfo.fetchTransparentBorderlessImage(cardName.toLowerCase());
    return { imageSrc: imageSrc, width: 34, height: 24, imageType: 'rectangle' };
  }

  getTitle(): string {
    return this.title + ' accepts following credit and debit cards';
  }
}
