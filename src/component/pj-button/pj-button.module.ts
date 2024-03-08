import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjBadgeModule } from '../pj-badge/pj-badge.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjButtonCtaComponent } from './pj-button-cta/pj-button-cta.component';
import { PjButtonFabComponent } from './pj-button-fab/pj-button-fab.component';
import { PjButtonFavoriteComponent } from './pj-button-favorite/pj-button-favorite.component';
import { PjButtonIconComponent } from './pj-button-icon/pj-button-icon.component';
import { PjButtonInlineComponent } from './pj-button-inline/pj-button-inline.component';
import { PjViewMoreBtnDirective } from './pj-view-more-btn.directive';
import { PjBtnWaitingDirective } from './pj-btn-waiting.directive';
@NgModule({
  declarations: [
    PjButtonCtaComponent,
    PjButtonFabComponent,
    PjButtonFavoriteComponent,
    PjButtonIconComponent,
    PjButtonInlineComponent,
    PjViewMoreBtnDirective,
    PjBtnWaitingDirective
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjBadgeModule
  ],
  exports: [
    PjButtonCtaComponent,
    PjButtonFabComponent,
    PjButtonFavoriteComponent,
    PjButtonIconComponent,
    PjButtonInlineComponent,
    PjViewMoreBtnDirective,
    PjBtnWaitingDirective
  ],
})
export class PjButtonModule { }
