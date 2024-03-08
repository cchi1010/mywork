import { Component, Input, OnInit } from '@angular/core';
import { PjProperty, PJ_SIZE } from '../components.global';

@Component({
  selector: 'pj-file',
  templateUrl: './pj-file.component.html',
  styleUrls: ['./pj-file.component.scss'],
})
export class PjFileComponent implements OnInit {
  // @Input()
  // size = SIZE.MEDIUM;

  @Input()
  addNewFile: boolean = false;

  // 有文件名则用某种方式打开对应文件显示或者下载，没有filetype为上传功能
  @Input()
  fileType = '';

  @Input()
  deletable = false;

  @Input()
  width: number = 80;

  constructor() {}

  ngOnInit(): void {
    if (this.addNewFile) {
      this._fileClass = 'addNewFile';
    }
  }

  getSizeStyle(): PjProperty {
    return {
      'width': this.width + 'px',
      'height': this.width + 'px',
    }
  }

  private _fileClass = '';
  getFileClass(): string {
    return this._fileClass;
  }
}
