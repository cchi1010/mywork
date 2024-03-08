import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjSideMenuComponent } from './pj-side-menu.component';
import { PjSideMenuItemComponent } from './pj-side-menu-item/pj-side-menu-item.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDividerModule } from '../pj-divider/pj-divider.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';

@NgModule({
  declarations: [PjSideMenuComponent, PjSideMenuItemComponent],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjButtonModule,
    PjDividerModule,
  ],
  exports: [PjSideMenuComponent],
})
export class PjSideMenuModule {}

