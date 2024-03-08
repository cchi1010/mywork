import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { PjImageData } from '../components.global';


@Component({
  selector: 'pj-image-group',
  templateUrl: './pj-image-group.component.html',
  styleUrls: ['./pj-image-group.component.scss'],
})
export class PjImageGroupComponent implements OnInit {
  @Input()
  width: number = 0;

  // 图片上的label以及图片链接
  @Input()
  images = new Array<PjImageData>();

  //每行几个图片
  @Input()
  qtyPerRow = 2;

  @Input()
  aspectRatio = 1;

  @Input()
  groupTitle?: string = '';

  @Input()
  groupDesc?: string = '';

  @Input()
  focused: boolean = false;

  @Output()
  imageClick = new EventEmitter<PjImageData>();

  private _imageWidth = 0;

  private _imageHeight = 0;

  private _unsubscribeAll: Subject<any> = new Subject();

  shownImages = new Array<Array<PjImageData>>();

  private _firstDivElm?: HTMLDivElement;

  constructor(
    private _appCfgService: AppConfigService,
    private _elm: ElementRef
  ) { }

  onImageClicked(imageItem: PjImageData): void {
    this.imageClick.emit(imageItem);
  }

  ngOnInit(): void {
    const rowCount = Math.ceil(this.images.length / this.qtyPerRow);
    for (let i = 0; i < rowCount; i++) {
      let rowImages = new Array<PjImageData>();
      for (let j = 0; j < this.qtyPerRow; j++) {
        if (j + i * this.qtyPerRow < this.images.length) {
          rowImages.push(this.images[j + i * this.qtyPerRow]);
        }
      }
      this.shownImages.push(rowImages);
    }
    if (this.width == 0) {
      this._appCfgService
        .timerEvent()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => this._setImageSize());
    } else {
      this._imageWidth = (this.width - 6);
      this._imageHeight = this.width / this.aspectRatio;
      this.shownImages.forEach(rowImgs => {
        rowImgs.forEach(image => {
          image.width = this._imageWidth;
          image.height = this._imageHeight;
        })
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  hasTitle(): boolean {
    return this.groupTitle != null && this.groupTitle.length > 0;
  }
  hasDescription(): boolean {
    return this.groupDesc != null && this.groupDesc.length > 0;
  }

  hasImages(): boolean {
    return this.images.length > 0;
  }

  private _setImageSize(): void {
    this._firstDivElm = this._elm.nativeElement.children[0];
    // following 8 is the gap between the element
    const w =
      ((this._firstDivElm?.offsetWidth || 0) - (this.qtyPerRow - 1) * 8) /
      this.qtyPerRow;
    if (this._imageWidth === w) {
      return;
    }
    this._imageWidth = w;
    this._imageHeight = this._imageWidth / this.aspectRatio;
    this.shownImages.forEach(rowImgs => {
      rowImgs.forEach(image => {
        image.width = this._imageWidth;
        image.height = this._imageHeight;
      })
    });
  }
  getImageGroupWidthStyle(): {} {
    if (this.width > 0) {
      return { width: (this.width - 2) + 'px' };
    }
    return {};
  }

  getFocusedClass(): string {
    return this.focused ? 'focused' : '';
  }
  getNewGroupStyle(): {} {
    return {
      width: this.width + 'px',
      height: this.width / this.aspectRatio + 'px',
    };
  }
}
