import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HasStringValue, PjImageData, PjImageTypeConst } from '../components.global';

@Component({
  selector: 'pj-loading',
  templateUrl: './pj-loading.component.html',
  styleUrls: ['./pj-loading.component.scss'],
})
export class PjLoadingComponent implements OnInit {
  ngOnInit(): void {
    if (!this.isShow) {
      document.body.style.overflowY = '';
    }
    if (this.delay && this.isShow) {
      setTimeout(() => {
        this.isShow = false
        document.body.style.overflowY = '';
      }, this.delay);
    }
  }
  @Input()
  title: string = 'Creating put-awat list';

  @Input()
  iconName: string = 'settings';

  @Input()
  imageSrc?: string;

  @Input()
  isShow: boolean = false;

  @Input()
  direction: 'top' | 'center' | 'bottom' = 'center';

  @Input()
  pjColor: string = 'primary';

  @Input()
  delay?: number;

  directionType = {
    Top: 'top',
    Center: 'center',
    Bottom: 'bottom'
  }

  hasTitle(): boolean {
    return HasStringValue(this.title);
  }
  getTitle() {
    return this.title;
  }

  getLoadingClass(): string {
    return this.isShow ? 'show' : 'hidden';
  }

  getContentClass(): string {
    switch (this.direction) {
      case this.directionType.Top: return 'top-4';
      case this.directionType.Bottom: return 'bottom-4';
      case this.directionType.Center: return 'top-2/4 -translate-y-2/4';
    }
    return '';
  }
  getIconName() {
    return this.iconName;
  }

  private _imageData?: PjImageData;
  getImageData(): PjImageData {
    if (this._imageData == null && this.imageSrc != null) {
      this._imageData = { imageSrc: this.imageSrc, imageType: PjImageTypeConst.CIRCLE };
    }
    return this._imageData || {};
  }
  getPjColor() {

    return this.pjColor;
  }

  getDirection() {
    return this.direction;
  }

  isImage(): boolean {
    return HasStringValue(this.imageSrc);
  }
}

