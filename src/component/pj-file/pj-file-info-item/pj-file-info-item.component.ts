import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjActionEvent, PjFileInfoData, PjImageData, PjImageTypeConst } from 'src/component/components.global';


@Component({
  selector: 'pj-file-info-item',
  templateUrl: './pj-file-info-item.component.html',
  styleUrls: ['./pj-file-info-item.component.scss'],
  host: { 'class': 'flex flex-row items-center gap-4' }
})
export class PjFileInfoItemComponent implements OnInit {

  @Input()
  fileInfoData?: PjFileInfoData;

  @Output()
  actionEvent = new EventEmitter<PjActionEvent>();
  constructor() { }

  private _fileIcon?: PjImageData;
  ngOnInit(): void {
  }

  getImageData(): PjImageData {
    if (this._fileIcon == null) {
      this._fileIcon = {
        imageSrc: this.fileInfoData?.fileIcon || '',
        width: 40, height: 40, imageType: PjImageTypeConst.RECTANGLE
      };
    }
    return this._fileIcon;
  }
  getFileName(): string {
    return this.fileInfoData?.fileName || '';
  }

  getFileDesc(): string {
    return this.fileInfoData?.fileDesc || '';
  }

  getFileSize(): string {
    return (this.fileInfoData?.fileSize || 0).toFixed(1) + 'MB';
  }

  hasAction(): boolean {
    return this.fileInfoData?.action != null;
  }

  getActionLabel(): string {
    return this.fileInfoData?.action?.label || 'Action';
  }

  onActionClick(): void {
    this.actionEvent.emit({ actionString: this.fileInfoData?.action?.actionString });
  }

}
