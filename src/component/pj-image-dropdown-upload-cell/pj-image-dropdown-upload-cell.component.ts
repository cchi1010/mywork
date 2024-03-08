import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HasStringValue } from 'src/component/components.global';
import { FileInfo } from 'src/model/base.model';

@Component({
  selector: 'pj-image-dropdown-upload-cell',
  templateUrl: './pj-image-dropdown-upload-cell.component.html',
  styleUrls: ['./pj-image-dropdown-upload-cell.component.scss']
})
export class PjImageDropdownUploadCellComponent implements OnInit {

  @Input()
  imageUri?: string;

  @Output()
  setImage = new EventEmitter<Array<FileInfo>>();

  @Output()
  chooseImage = new EventEmitter<void>();
  


  ngOnInit(): void {
    
  }
  hasImage(): boolean {
    return HasStringValue(this.imageUri);
  }

  setImageInfo(e:Array<FileInfo>): void {
    this.imageUri=e[0].content;
    this.setImage.emit(e);
  }

  deleteThisImage(): void {
    this.imageUri='';
  }

  getThisImage():string{
    return this.imageUri||'';
  }

  clickChooseImage():void{
    this.chooseImage.emit();
  }
}


