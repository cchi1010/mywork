import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjFileUploadingComponent } from './pj-file-uploading.component';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjFileUploadDockDirective } from '../pj-file-upload-dock.directive';
import { PjFileDragDropUploadDirective } from '../pj-file-drag-drop-upload.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    PjFileUploadingComponent,
    PjFileUploadDockDirective,
    PjFileDragDropUploadDirective
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    DragDropModule,
  ],
  exports: [
    PjFileUploadingComponent,
    PjFileUploadDockDirective,
    PjFileDragDropUploadDirective
  ],
})
export class PjFileUploadingModule { }
