import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjImageManageComponent } from './pj-image-manage.component';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';

@NgModule({
  declarations: [
    PjImageManageComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjImageModule,
    PjButtonModule,
    PjIconModule,
  ],
  exports: [
    PjImageManageComponent
  ],
})
export class PjImageManageModule { }

// export type PjImageManageActionLocation = 'corner' | 'center' | undefined;

// export const PjImageManageActionLocationConst = {
//   CORNER: 'corner' as PjImageManageActionLocation,
//   CENTER: 'center' as PjImageManageActionLocation,
// };
