import { PjPhoneNumberEntryModule } from 'src/component/pj-text-entry/pj-phone-number-entry/pj-phone-number-entry.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjDlgRemoveModule } from 'src/component/pj-modal-window/pj-dlg-remove/pj-dlg-remove.module';

import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjAccordionModule } from '../pj-accordion/pj-accordion.module';
import { PjCheckboxModule } from '../pj-choice-box/pj-checkbox/pj-checkbox.module';
import { PjDropdownModule } from '../pj-dropdown/pj-dropdown.module';
import { PjSelectionGroupModule } from '../pj-selection-group/pj-selection-group.module';
import { PjSwitchModule } from '../pj-switch/pj-switch.module';
import { PjTextEntryModule } from '../pj-text-entry/pj-text-entry.module';
import { PjAddressFormComponent } from './pj-address-form/pj-address-form.component';
import { PjAddressItemComponent } from './pj-address-item/pj-address-item.component';
import { PjAddressNewComponent } from './pj-address-new/pj-address-new.component';
import { PjAddressComponent } from './pj-address.component';

@NgModule({
  declarations: [
    PjAddressComponent,
    PjAddressItemComponent,
    PjAddressFormComponent,
    PjAddressNewComponent,
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjButtonModule,
    PjTextEntryModule,
    PjDlgRemoveModule,
    PjCheckboxModule,
    PjSwitchModule,
    PjAccordionModule,
    PjDropdownModule,
    PjSelectionGroupModule,
    PjPhoneNumberEntryModule,
  ],
  exports: [
    PjAddressComponent,
    PjAddressItemComponent,
    PjAddressFormComponent,
    PjAddressNewComponent,
  ],
})
export class PjAddressModule {}
