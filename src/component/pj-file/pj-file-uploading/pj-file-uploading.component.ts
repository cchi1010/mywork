import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FileItem, FileUploader } from 'ng2-file-upload';
import { BehaviorSubject, filter } from 'rxjs';
import { HasStringValue, cloneNewObjectByJSON } from 'src/component/components.global';
import { FileInfo } from 'src/model/base.model';
import { PjFileUploadDockDirective } from '../pj-file-upload-dock.directive';



@Component({
  selector: 'pj-file-uploading',
  templateUrl: './pj-file-uploading.component.html',
  styleUrls: ['./pj-file-uploading.component.scss'],
})
export class PjFileUploadingComponent implements OnInit {

  @ContentChild(PjFileUploadDockDirective)
  private _fileUploadedDock?: PjFileUploadDockDirective;

  @ViewChild('fileElm')
  private _htmlFileElm?: ElementRef;

  @Input()
  fileType: string = ''; // audio/*, video/*, image/*, or the file extension like .doc/.pdf

  @Input()
  multipleFiles: boolean = false;

  @Input()
  fileReceiverUrl: string = '';

  @Output()
  base64Content = new EventEmitter<Array<FileInfo>>();

  @Output()
  base64ContentWithId = new EventEmitter<{ key: string, value: Array<FileInfo> }>();

  @Output()
  progressChanged = new EventEmitter<number>();

  @Output()
  progressWithIdChanged = new EventEmitter<{ key: string, value: number }>();

  private _uploadItemId: string = '';
  private _filesContent?: Array<FileInfo>;
  private _fileUploader?: FileUploader;
  private _loadedAllEvent = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngAfterViewInit(): void {
    if (this._fileUploadedDock != null && this._htmlFileElm != null) {
      this._fileUploadedDock.setFileInputElm(this._htmlFileElm);
    }
  }

  ngOnInit(): void {
    const that = this;
    this._fileUploader = new FileUploader({
      url: this.fileReceiverUrl,
      removeAfterUpload: true,
    });
    this._fileUploader.onProgressItem = function (
      fileItem: FileItem,
      progress: number
    ): void {
    };
    this._fileUploader.onProgressAll = function (progress: number): void {
      let a: { key: string, value: number } = {
        key: that._uploadItemId,
        value: progress
      };
      that.progressChanged.emit(progress);
      that.progressWithIdChanged.emit(a);
    };
    this._fileUploader.onCompleteAll = function (): void {
    };
    this._loadedAllEvent.pipe(
      filter(v => v)
    ).subscribe(() => {
      let a: { key: string, value: Array<FileInfo> } = {
        key: that._uploadItemId,
        value: that._filesContent || []
      };
      that.base64Content.emit(that._filesContent);
      that.base64ContentWithId.emit(a);
      that.progressChanged.emit(100);
      that.progressWithIdChanged.emit({ key: that._uploadItemId, value: 100 });
      that._fileUploader?.clearQueue();
    });
  }

  isMultipleFileSupportted(): boolean {
    return this.multipleFiles;
  }

  getFileType(): string {
    return this.fileType;
  }

  onFileSelectBtnClick(elm: HTMLInputElement): void {
    this._uploadItemId = (new Date()).getTime() + '';
    elm.click();
  }

  onFilesDroped(event: any): void {
    this.onFilesSelected({ currentTarget: { files: event } });
  }

  private checkFileType(fileType:string):boolean{
    if (this.fileType.search('image')!=-1 && fileType.search('image')==-1){
      return false;
    }else if (this.fileType.search('video')!=-1 && fileType.search('video')==-1){
      return false;
    }else if (this.fileType.search('audio')!=-1 && fileType.search('audio')==-1){
      return false;
    }
    return true;
  }

  onFilesSelected(event: any): void {
    let files=event.target.files;
    let addedFiles:Array<File>=[];
    if (files.length>0){
      for(let i=files.length-1;i>=0;i--){
        if (this.checkFileType(files[i].type)){
          addedFiles.push(files[i]);
        }
      }
    }
    this._uploadItemId = (new Date()).getTime() + '';
    if (this._fileUploader == null) {
      return;
    }
    // this._fileUploader.addToQueue(event.currentTarget['files']);
    this._fileUploader.addToQueue(addedFiles);
    if (HasStringValue(this.fileReceiverUrl)) {
      this._fileUploader.uploadAll();
    } else {
      this._filesContent = new Array<FileInfo>();
      this._fileUploader.queue.forEach((uploadedFile, index, allFiles) => {
        let fileReader = new FileReader();
        fileReader.onloadend = (() => {
          let fileData = fileReader.result;
          if (typeof (fileData) === 'string') {
            let fileInfo = new FileInfo();
            fileInfo.blobContent = uploadedFile._file;
            fileInfo.fileName = uploadedFile.file.name;
            // fileInfo.fileType = uploadedFile.file.name.substring(uploadedFile.file.name.lastIndexOf('.') + 1);
            fileInfo.content = fileData;
            this._filesContent?.push(fileInfo);
            if (this._filesContent?.length === allFiles.length) {
              this._loadedAllEvent.next(true);
            }
          }
        });
        fileReader.readAsDataURL(uploadedFile._file);
      });
    }
  }

}



