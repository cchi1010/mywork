import { PjIconModule } from 'src/component/pj-icon/pj-icon.module';
import { PjFileUploadingModule } from 'src/component/pj-file/pj-file-uploading/pj-file-uploading.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjTableComponent } from './pj-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjActionItemModule } from 'src/component/pj-action-item/pj-action-item.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjBadgeModule } from 'src/component/pj-badge/pj-badge.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjLinkModule } from 'src/component/pj-link/pj-link.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjCheckboxModule } from '../pj-choice-box/pj-checkbox/pj-checkbox.module';
import { PjCheckboxGroupModule } from '../pj-choice-box/pj-checkbox/pj-checkbox-group.module';
import { PjPerfixInputModule } from 'src/component/pj-text-entry/pj-perfix-input/pj-perfix-input.module';
import { PjImageManageModule } from 'src/component/pj-image-manage/pj-image-manage.module';
import { PjEmptyStatusModule } from 'src/component/pj-empty-status/pj-empty-status.module';
import { PjClickToEditCellModule } from 'src/component/pj-click-to-edit-cell/pj-click-to-edit-cell.module';
import { PjImageDropdownUploadCellModule } from 'src/component/pj-image-dropdown-upload-cell/pj-image-dropdown-upload-cell.module';
import { PjInputChipCellModule } from 'src/component/pj-input-chip-cell/pj-input-chip-cell.module';
import { PjInputDataCellModule } from '../pj-input-data-cell/pj-input-data-cell.module';
import { PjInputDropdownCellModule } from '../pj-input-dropdown-cell/pj-input-dropdown-cell.module';
import { PjProgressCircleModule } from 'src/component/pj-progress-circle/pj-progress-circle.module';

@NgModule({
  declarations: [
    PjTableComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    PjDirectiveModule,
    BrowserModule,
    PjImageModule,
    PjImageManageModule,
    PjEmptyStatusModule,
    PjCheckboxGroupModule,
    PjCheckboxModule,
    PjActionItemModule,
    PjButtonModule,
    PjTextEntryModule,
    PjBadgeModule,
    PjLinkModule,
    PjDropdownModule,
    PjPerfixInputModule,
    PjFileUploadingModule,
    PjIconModule,
    PjProgressCircleModule,
    PjInputDataCellModule,
    PjClickToEditCellModule,
    PjInputChipCellModule,
    PjInputDropdownCellModule,
    PjImageDropdownUploadCellModule,
  ],
  exports: [
    PjTableComponent
  ]
})
export class PjTableModule { }

