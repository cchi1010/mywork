import { Component, Input } from '@angular/core';
import { HasStringValue, PJ_SIZE, PjImageData, PjImageTypeConst } from 'src/component/components.global';
import { PjSelectionItemComponent } from '../pj-selection-item.component';

@Component({
  selector: 'pj-selitem-stacked-card',
  templateUrl: './pj-selitem-stacked-card.component.html',
  styleUrls: ['./pj-selitem-stacked-card.component.scss'],
})
export class PjSelitemStackedCardComponent extends PjSelectionItemComponent {

  @Input()
  pjSize?: string;

  @Input()
  subTitle?: string;

  @Input()
  value?: string;

  @Input()
  iconName?: string;

  @Input()
  imageSrc?: string;

  hasSubTitle(): boolean {
    return HasStringValue(this.subTitle);
  }
  getSubTitle(): string {
    return this.subTitle || '';
  }

  hasValue(): boolean {
    return HasStringValue(this.value);
  }
  getValue(): string {
    return this.value || '';
  }

  hasImage(): boolean {
    return HasStringValue(this.imageSrc);
  }

  hasIcon(): boolean {
    return HasStringValue(this.iconName);
  }

  getIconName(): string {
    return this.iconName || '';
  }

  private _imageData?: PjImageData;
  getImageData(): PjImageData {
    if (this._imageData == null) {
      let size = 24;
      if (this.pjSize === PJ_SIZE.LARGE) {
        size = 32;
      }
      this._imageData = {
        imageSrc: this.imageSrc,
        width: size, height: size,
        imageType: PjImageTypeConst.RECTANGLE
      };
    }
    return this._imageData;
  }
}
