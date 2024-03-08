import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANT } from 'src/app/app.constant';
import { HasStringValue } from '../components.global';

@Component({
  selector: 'pj-thumbnail',
  templateUrl: './pj-thumbnail.component.html',
  styleUrls: ['./pj-thumbnail.component.scss']
})
export class PjThumbnailComponent implements OnInit {

  @Input()
  thumbnailSrc?: string;

  constructor() { }

  ngOnInit(): void { }

  getImageSrc(): string {
    return HasStringValue(this.thumbnailSrc) ? this.thumbnailSrc! : APPCONSTANT.emptyImage;
  }
}
