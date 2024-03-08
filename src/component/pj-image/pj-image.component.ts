import { Component, Input, OnInit } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';
import { APPCONSTANT } from 'src/app/app.constant';
import { HasStringValue, PjImageData, PjImageTypeConst, PjProperty } from '../components.global';


@Component({
  selector: 'pj-image',
  templateUrl: './pj-image.component.html',
  styleUrls: ['./pj-image.component.scss'],
})
export class PjImageComponent implements OnInit {
  @Input()
  imageData?: PjImageData;

  @Input()
  imageIcon?: boolean;

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this._initializeStyle();
    interval(100).pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => this._initializeStyle());
  }

  private _initializeStyle(): void {
    if (this.imageData?.imageType == PjImageTypeConst.RECTANGLE) {
      this._imageStyle = {
        width: (this.imageData?.width || 64) + 'px',
        height: (this.imageData?.height || 64) + 'px',
        'border-width': HasStringValue(this.imageData?.borderColor) ? '2px' : '0px',
      };
    } else {
      this._imageStyle = {
        width: (this.imageData?.width || 64) + 'px',
        height: (this.imageData?.width || 64) + 'px',
        'border-width': HasStringValue(this.imageData?.borderColor) ? '2px' : '0px',
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  hasLabel(): boolean {
    return HasStringValue(this.imageData?.label);
  }

  getLabel(): string {
    return this.imageData?.label || '';
  }

  getImageSrc(): string {
    return HasStringValue(this.imageData?.imageSrc) ? this.imageData?.imageSrc! : APPCONSTANT.emptyImage;
  }

  getLabelPositionClass(): string {
    let ic = this.imageData?.noMouseEffection ? 'noEvent' : '';
    ic = ic + (HasStringValue(this.imageData?.borderColor) ? (' ' + this.imageData?.borderColor) : '');
    if (this.imageData?.imageType == PjImageTypeConst.RECTANGLE) {
      ic = ic + ' place-content-end square';
    } else {
      ic = ic + ' place-content-center items-center circle';
    }
    return ic;
  }

  private _imageStyle?: PjProperty;
  getImageStyle(): {} {
    return this._imageStyle || {};
  }

  hasBadge(): boolean {
    return this.imageData?.imageType === PjImageTypeConst.RECTANGLE && HasStringValue(this.imageData?.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.imageData?.badgeLabel || '';
  }

  getBadgeSize(): string {
    let w = (this.imageData?.width || 0);
    if (w <= 64) {
      return 'sm';
    } else if (w <= 120) {
      return 'md';
    }
    return 'lg'
  }

  hasImageIcon(): boolean {
    return this.imageIcon == true;
  }

  onImageClick(): void {
    // if (this.imageData != null && HasStringValue(this.imageData?.imageSrc) && isTrue(this.imageData.enlargeable)) {
    //   let imageD: PjImageData = cloneNewObjectByJSON(this.imageData);
    //   imageD.width = 600;
    //   imageD.height = 600 * ((this.imageData!.height || 64) / (this.imageData!.width || 64));
    //   imageD.noMouseEffection = true;
    //   this._modalService.openModalWindow({}, PjImageComponent, { imageData: imageD });
    // }
  }
}
