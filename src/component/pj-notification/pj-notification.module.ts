import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjNotificationComponent } from './pj-notification.component';
import { PjIconModule } from '../pj-icon/pj-icon.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from '../pj-button/pj-button.module';



@NgModule({
  declarations: [
    PjNotificationComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjIconModule,
    PjButtonModule
  ],
  exports: [
    PjNotificationComponent
  ]
})
export class PjNotificationModule { }
