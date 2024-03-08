import { PjVideoModule } from '../pj-video/pj-video.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjVideoManageComponent} from './pj-video-manage.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';

@NgModule({
  declarations: [
    PjVideoManageComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjImageModule,
    PjButtonModule,
    PjIconModule,
    PjVideoModule
  ],
  exports: [
    PjVideoManageComponent
  ],
})
export class PjVideoManageModule { }

