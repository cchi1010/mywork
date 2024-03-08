import { Component, Input, OnInit } from '@angular/core';
import { PJ_PAYMENT_METHOD, PjAlertData } from 'src/component/components.global';

@Component({
  selector: 'pj-new-payment',
  templateUrl: './pj-new-payment.component.html',
  styleUrls: ['./pj-new-payment.component.scss'],
})
export class PjNewPaymentComponent implements OnInit {
  @Input()
  paymentMethod: PJ_PAYMENT_METHOD = PJ_PAYMENT_METHOD.CREDIT;

  @Input()
  webSiteName!: string;

  private _brandInfo?: string;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    switch (this.paymentMethod) {
      case PJ_PAYMENT_METHOD.APPLE_PAY:
        this._brandInfo = 'Apple';
        break;
      case PJ_PAYMENT_METHOD.GOOGLE_PAY:
        this._brandInfo = 'Google';
        break;
      case PJ_PAYMENT_METHOD.PAYPAL:
        this._brandInfo = 'PayPal';
        break;
      default:
        this._brandInfo = '';
        break;
    }
  }
  isCard(): boolean {
    switch (this.paymentMethod) {
      case PJ_PAYMENT_METHOD.CREDIT:
        return true;
      case PJ_PAYMENT_METHOD.DEBIT:
        return true;
      default:
        return false;
    }
  }

  getAlertData(): PjAlertData {
    return {
      title: 'Link your ' + this._brandInfo + ' account',
      descriptions: [
        'By pressing “Link my ' +
        this._brandInfo +
        ' account”, you will be redirected to ' +
        this._brandInfo +
        '’s website to authorize your payment method, then you will be returned to ' + this.webSiteName,
      ],
    };
  }
}
