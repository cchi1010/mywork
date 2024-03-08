import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from '../../components.global';

@Component({
  selector: 'pj-file-upload-status',
  templateUrl: './pj-file-upload-status.component.html',
  styleUrls: ['./pj-file-upload-status.component.scss'],
})
export class PjFileUploadStatusComponent implements OnInit {
  @Input()
  fileUploadProgress: number = 0;

  @Input()
  fileName: string = '';

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  constructor() {}

  ngOnInit(): void {
    if (this.fileUploadProgress > 100) {
      this.fileUploadProgress = 100;
    }
    if (this.fileUploadProgress < 0) {
      this.fileUploadProgress = 0;
    }
  }

  isUploading(): boolean {
    return this.fileUploadProgress < 100;
  }

  getFileName(): string {
    return this.fileName;
  }

  getProgressLabel(): string {
    return this.fileUploadProgress + '%';
  }

  getUploadingProgress(): number {
    return this.fileUploadProgress;
  }

  onCancelBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CANCEL });
  }
  onDeleteBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.REMOVE });
  }
}
