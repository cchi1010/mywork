import { PjImageManageModule } from 'src/component/pj-image-manage/pj-image-manage.module';
import { PjFileUploadingModule } from 'src/component/pj-file/pj-file-uploading/pj-file-uploading.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjDropdownDirective } from 'src/component/pj-dropdown/pj-dropdown.directive';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { NgModule } from '@angular/core';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { CommonModule } from '@angular/common';
import { PjEmptyStatusModule } from 'src/component/pj-empty-status/pj-empty-status.module';
import { PjImageDropdownUploadCellComponent } from './pj-image-dropdown-upload-cell.component';


@NgModule({
  declarations: [
    PjImageDropdownUploadCellComponent
  ],
  imports: [
    CommonModule,
    PjDirectiveModule,
    PjButtonModule,
    PjDropdownModule,
    PjImageManageModule,
    PjEmptyStatusModule,
    PjFileUploadingModule,
  ],
  exports: [
    PjImageDropdownUploadCellComponent
  ]
})
export class PjImageDropdownUploadCellModule { }
