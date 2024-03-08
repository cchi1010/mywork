import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from '../../../components.global';

@Component({
  selector: 'pj-file-upload-status-error',
  templateUrl: './pj-file-upload-status-error.component.html',
  styleUrls: ['./pj-file-upload-status-error.component.scss'],
})

export class PjFileUploadStatusErrorComponent implements OnInit {
  

  @Input()
  fileName: string = 'File';

  @Input()
  errorInfo: string='File format incorrect or outdated';

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  constructor() {}

  ngOnInit(): void {
   
  }

  getFileName(): string {
    return this.fileName;
  }
  getErrorInfo(): string {
    return this.errorInfo;
  }

 

  onCloseBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
  }

}
