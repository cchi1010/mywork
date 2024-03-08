import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDlgRemoveModule } from '../pj-modal-window/pj-dlg-remove/pj-dlg-remove.module';
import { PjPanelModule } from '../pj-panel/pj-panel.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjCreditCardDetailComponent } from './pj-credit-card-detail/pj-credit-card-detail.component';
import { PjNewPaymentComponent } from './pj-new-payment/pj-new-payment.component';
import { PjCreditCardEditComponent } from './pj-credit-card-edit/pj-credit-card-edit.component';
import { PjCreditCardNewComponent } from './pj-credit-card-new/pj-credit-card-new.component';
import { PjLinkedPaymentDetailComponent } from './pj-linked-payment-detail/pj-linked-payment-detail.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjAlertModule } from '../pj-alert/pj-alert.module';
import { PjCreditCardSupportedComponent } from './pj-credit-card-supported/pj-credit-card-supported.component';
import { PjTextEntryModule } from '../pj-text-entry/pj-text-entry.module';
import { PjDropdownModule } from '../pj-dropdown/pj-dropdown.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjCardNumberEntryModule } from '../pj-text-entry/pj-card-number-entry/pj-card-number-entry.module';

@NgModule({
  declarations: [
    PjCreditCardDetailComponent,
    PjNewPaymentComponent,
    PjCreditCardEditComponent,
    PjCreditCardNewComponent,
    PjLinkedPaymentDetailComponent,
    PjCreditCardSupportedComponent,
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjPanelModule,
    PjDlgRemoveModule,
    PjButtonModule,
    PjIconModule,
    PjAlertModule,
    PjImageModule,
    PjCardNumberEntryModule,
    PjTextEntryModule,
    PjDropdownModule,
    PjPanelModule,
  ],
  exports: [
    PjCreditCardDetailComponent,
    PjNewPaymentComponent,
    PjCreditCardEditComponent,
    PjCreditCardNewComponent,
    PjLinkedPaymentDetailComponent,
    PjCreditCardSupportedComponent,
  ],
})
export class PjPaymentModule {}
