import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjFileUploadStatusComponent } from './pj-file-upload-status.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjProgressBarModule } from '../../pj-progress/pj-progress-bar/pj-progress-bar.module';
import { PjSpinnerModule } from '../../pj-spinner/pj-spinner.module';
import { PjIconModule } from '../../pj-icon/pj-icon.module';
import { PjButtonModule } from '../../pj-button/pj-button.module';
import { PjFileUploadStatusErrorComponent } from 'src/component/pj-file/pj-file-upload-status/pj-file-upload-status-error/pj-file-upload-status-error.component';

@NgModule({
  declarations: [
    PjFileUploadStatusComponent,
    PjFileUploadStatusErrorComponent],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjProgressBarModule,
    PjSpinnerModule,
    PjIconModule,
    PjButtonModule,
  ],
  exports: [
    PjFileUploadStatusComponent,
    PjFileUploadStatusErrorComponent],
})
export class PjFileUploadStatusModule { }
