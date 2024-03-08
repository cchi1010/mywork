import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjTabGroupComponent } from './pj-tab-group.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTabTextItemComponent } from './pj-tab-text-item/pj-tab-text-item.component';
import { PjBadgeModule } from '../pj-badge/pj-badge.module';
import { PjTabItemComponent } from './pj-tab-item.component';
import { PjTabUnderlinedItemComponent } from './pj-tab-underlined-item/pj-tab-underlined-item.component';
import { PjTabPillItemComponent } from './pj-tab-pill-item/pj-tab-pill-item.component';
import { PjTabOutlinedItemComponent } from './pj-tab-outlined-item/pj-tab-outlined-item.component';
import { PjButtonModule } from '../pj-button/pj-button.module';

@NgModule({
  declarations: [
    PjTabGroupComponent,
    PjTabItemComponent,
    PjTabTextItemComponent,
    PjTabUnderlinedItemComponent,
    PjTabPillItemComponent,
    PjTabOutlinedItemComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjBadgeModule,
    PjIconModule,
    PjButtonModule
  ],
  exports: [
    PjTabGroupComponent,
  ]
})
export class PjTabGroupModule { }

