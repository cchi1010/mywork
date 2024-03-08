import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSelectionGroupComponent } from './pj-selection-group.component';
import { PjSelectionItemDirective } from './pj-selection-item.directive';
import { PjSelitemStackedCardComponent } from './pj-selitem-stacked-card/pj-selitem-stacked-card.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjSelectionItemComponent } from './pj-selection-item.component';
import { PjSelitemCardComponent } from './pj-selitem-card/pj-selitem-card.component';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjSelitemGenericComponent } from './pj-selitem-generic/pj-selitem-generic.component';
import { PjSelitemImageComponent } from './pj-selitem-image/pj-selitem-image.component';

@NgModule({
  declarations: [
    PjSelectionGroupComponent,
    PjSelectionItemDirective,
    PjSelectionItemComponent,
    PjSelitemStackedCardComponent,
    PjSelitemCardComponent,
    PjSelitemImageComponent,
    PjSelitemGenericComponent,
  ],
  imports: [CommonModule, PjDirectiveModule, PjIconModule, PjImageModule],
  exports: [
    PjSelectionGroupComponent,
    PjSelectionItemDirective,
    PjSelitemStackedCardComponent,
    PjSelitemCardComponent,
    PjSelitemImageComponent,
    PjSelitemGenericComponent
  ],
})
export class PjSelectionGroupModule {}
