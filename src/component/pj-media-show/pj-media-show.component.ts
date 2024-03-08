import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PjAction, PjImageData, PjImageTypeConst } from 'src/component/components.global';

import { AppConfigService } from 'src/app/app.config';
import { Subject, takeUntil } from 'rxjs';
import { ScreenSizeBreakPointString } from 'src/app/app.constant';

@Component({
  selector: 'pj-media-show',
  templateUrl: './pj-media-show.component.html',
  styleUrls: ['./pj-media-show.component.scss'],
})
export class PjMediaShowComponent implements OnInit, OnDestroy {
  @ViewChild('amMediaShowElm', { static: true })
  imageRowRef: ElementRef | undefined;

  @Input()
  type = 'normal'; // 两种形式： normal | condensed

  @Input()
  medias?: Array<PjImageData>; //可以是图片和视频

  @Input()
  actions?: Array<PjAction>;

  private _currentMedia?: PjImageData;
  private _imageWidth: number = 0;
  private _previewThumbnails = 0;

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(private _appCfgService: AppConfigService) { }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnChanges(): void {
    // if (this._currentMedia != null) {
    //   return;
    // }
    if (this.medias != null && this.medias.length > 0) {
      for (let i = 0; i < this.medias?.length; i++) {
        this.medias[i].index = i;
      }
      this.medias[0].borderColor = 'secondary';
      this._currentMedia = this._setCurrentMedia(0);
    }
  }

  ngOnInit(): void {
    this._appCfgService
      .timerEvent()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this._setImageSize());
  }

  hasAction(): boolean {
    return this.actions != null && this.actions.length > 0;
  }

  onThumbnailClick(elm: PjImageData): void {
    this._currentMedia = this._setCurrentMedia(elm.index || 0);
    this._setFocusedThumbnailStyle(elm.index);
  }

  private _setImageSize(): void {
    if (
      this.type !== 'normal' ||
      this._imageWidth === this.imageRowRef?.nativeElement.offsetWidth
    ) {
      return;
    }
    this._imageWidth = this.imageRowRef?.nativeElement.offsetWidth;
    this._previewThumbnails = Math.floor(this._imageWidth / (48 + 20));
  }

  hasNavigationButtons(): boolean {
    if (this.medias?.length == null || this.medias.length <= 0) {
      return false;
    }
    if (this.medias.length > this._previewThumbnails) {
      return true;
    }
    return false;
  }

  onArrowBtnClick(direction: string): void {
    if (direction === 'forward') {
      this._setCurrentElm(-1);
    } else {
      this._setCurrentElm(1);
    }
  }

  private _setCurrentElm(step: number): void {
    let curIndex = this._currentMedia?.index;
    if (curIndex == null || this.medias == null) {
      return;
    }
    curIndex = curIndex + step;
    if (curIndex < 0) {
      curIndex = 0;
    } else if (curIndex > this.medias.length - 1) {
      curIndex = this.medias.length - 1;
    }
    for (let i = 0; i < this.medias.length; i++) {
      if (curIndex == i) {
        this._currentMedia = this._setCurrentMedia(i);
      }
    }
    this._setFocusedThumbnailStyle(curIndex);
  }

  private _setCurrentMedia(index: number): PjImageData | undefined {
    if (this.medias == null || this.medias.length == 0) {
      return undefined;
    }
    return {
      index: this.medias[index].index,
      label: this.medias[index].label,
      imageSrc: this.medias[index].imageSrc,
      imageType: PjImageTypeConst.RECTANGLE,
      noMouseEffection: true
    };
  }
  private _setFocusedThumbnailStyle(focusedIndex?: number): void {
    if (this.medias == null || this.medias.length == 0 || focusedIndex == null) {
      return;
    }
    this.medias.forEach(img => {
      img.borderColor = undefined;
    });
    if (focusedIndex >= 0 && focusedIndex < this.medias.length) {
      this.medias[focusedIndex].borderColor = 'secondary';
    }
  }

  getCurrentMedia(): PjImageData {
    if (this.medias == null || this.medias.length == 0) {
      return {};
    }
    if (this._currentMedia == null) {
      this._currentMedia = this._setCurrentMedia(0);
    }
    if (this._currentMedia == null) {
      return {};
    }
    this._currentMedia.width = this._imageWidth;
    this._currentMedia.height = (this._imageWidth * 2) / this._getRatio();
    this._currentMedia.imageType = PjImageTypeConst.RECTANGLE;
    return this._currentMedia || {};
  }

  private _getRatio(): number {
    let c = this._appCfgService.getScreenSize();
    if (c == ScreenSizeBreakPointString.XS) {
      return 3;
    }
    if (c == ScreenSizeBreakPointString.SM) {
      return 3;
    }
    return 2;
  }
  hasCurrentMedia(): boolean {
    return this._currentMedia != null;
  }

  getThumbnailData(imageData: PjImageData): PjImageData {
    return {
      index: imageData.index,
      label: imageData.label,
      imageSrc: imageData.imageSrc,
      borderColor: imageData.borderColor,
      imageType: PjImageTypeConst.RECTANGLE,
      width: 48,
      height: 48,
    };
  }
}
