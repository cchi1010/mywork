import { Component, Input, OnInit } from '@angular/core';
import { PjPaymentInfo } from 'src/component/components.global';

@Component({
  selector: 'pj-linked-payment-detail',
  templateUrl: './pj-linked-payment-detail.component.html',
  styleUrls: ['./pj-linked-payment-detail.component.scss']
})
export class PjLinkedPaymentDetailComponent implements OnInit {

  @Input()
  paymentInfo?: PjPaymentInfo;

  constructor() { }

  ngOnInit(): void {
  }

  getIssuerImage(): string {
    return PjPaymentInfo.fetchBorderedImage((this.paymentInfo?.type||'').toLowerCase());
  }

}
