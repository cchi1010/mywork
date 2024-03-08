import { Component, Input, OnInit } from '@angular/core';
import { PjPaymentInfo } from 'src/component/components.global';

@Component({
  selector: 'pj-credit-card-detail',
  templateUrl: './pj-credit-card-detail.component.html',
  styleUrls: ['./pj-credit-card-detail.component.scss'],
})
export class PjCreditCardDetailComponent implements OnInit {
  @Input()
  creditInfo?: PjPaymentInfo;

  @Input()
  backgroudNumner?: number;

  constructor() { }

  ngOnInit(): void { }

  getIssuerImage(): string {
    return PjPaymentInfo.fetchBorderedImage((this.creditInfo?.type || '').toLowerCase());
  }
  getExpiratedClass(): string {
    if (this.creditInfo?.isExpirated) {
      return 'expired';
    }
    return '';
  }
  getIconName(): string {
    if (this.creditInfo?.isExpirated) {
      return 'credit_card_off';
    }
    if (this.creditInfo?.isDefault) {
      return 'star';
    }
    return '';
  }
  getStatusClass(): string {
    if (this.creditInfo?.isExpirated) {
      return 'expired';
    }
    if (this.creditInfo?.isDefault) {
      return 'default';
    }
    return '';
  }

  getCreditCardImage(): string {
    return 'assets/image/credit_background_' + (this.backgroudNumner || 1) + '.png';
  }
}
