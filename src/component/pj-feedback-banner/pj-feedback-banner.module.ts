import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjFeedbackBannerComponent } from './pj-feedback-banner.component';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjScreenItemDirectiveModule } from 'src/directive/pj-screen-item.directive';
import { PjFeedbackBannerService } from './pj-feedback-banner.service';



@NgModule({
  declarations: [
    PjFeedbackBannerComponent
  ],
  imports: [
    CommonModule,

    PjDirectiveModule,
    PjScreenItemDirectiveModule,
    PjImageModule,
    PjButtonModule,
    PjIconModule
  ],
  providers: [PjFeedbackBannerService],
  exports: [
    PjFeedbackBannerComponent
  ]
})
export class PjFeedbackBannerModule { }
