import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjNavbarComponent } from './pj-navbar.component';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjLinkModule } from 'src/component/pj-link/pj-link.module';
import { PjSearchBarModule } from 'src/component/pj-search-bar/pj-search-bar.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjNavbarGroupComponent } from './pj-navbar-group/pj-navbar-group.component';
import { PjNavbarItemComponent } from './pj-navbar-item/pj-navbar-item.component';
import { PjNavbarResultGroupComponent } from './pj-navbar-result-group/pj-navbar-result-group.component';
import { PjNavbarKeywordLabelComponent } from './pj-navbar-result-group/pj-navbar-keyword-label/pj-navbar-keyword-label.component';

@NgModule({
  declarations: [
    PjNavbarComponent,
    PjNavbarItemComponent,
    PjNavbarGroupComponent,
    PjNavbarKeywordLabelComponent,
    PjNavbarResultGroupComponent
  ],
  imports: [
    CommonModule,

    PjDividerModule,
    PjDirectiveModule,
    PjLinkModule,
    PjButtonModule,
    PjSearchBarModule,
    PjIconModule,
  ],
  exports: [
    PjNavbarComponent,
    PjNavbarItemComponent,
    PjNavbarGroupComponent,
    PjNavbarResultGroupComponent
  ]
})
export class PjNavbarModule { }

