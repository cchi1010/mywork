import { Component, Input, OnInit,HostBinding } from '@angular/core';
import { PjAction, DIRECTION, HasStringValue, PjImageData, PjImageTypeConst } from '../components.global';

@Component({
  selector: 'pj-action-image-item',
  templateUrl: './pj-action-image-item.component.html',
  styleUrls: ['./pj-action-image-item.component.scss']
})
export class PjActionImageItemComponent implements OnInit {

  @Input()
  pjSize?: string;

  @Input()
  actionItemData?: PjAction;

  @HostBinding('style.pointer-events')
  get disabledClick(): string {
    return this.actionItemData?.disabled ? 'none' : '';
  }

  direction: string = DIRECTION.H;

  constructor() { }

  ngOnInit(): void { }

  hasImage(): boolean {
    return HasStringValue(this.actionItemData?.imageSrc);
  }

  hasIcon(): boolean {
    return HasStringValue(this.actionItemData?.iconName);
  }

  getIconName(): string {
    return this.actionItemData?.iconName || '';
  }

  private _imageData?: PjImageData;
  getImageData(): PjImageData {
    if (this._imageData == null) {
      this._imageData = {
        imageSrc: this.actionItemData?.imageSrc,
        width: this.pjSize === 'xl' ? 28 : 20,
        height: this.pjSize === 'xl' ? 28 : 20,
        imageType: PjImageTypeConst.RECTANGLE
      };
    }
    return this._imageData;
  }
  hasActionLabel(): boolean {
    return HasStringValue(this.actionItemData?.actionLabel);
  }

  hasDescription(): boolean {
    return HasStringValue(this.actionItemData?.description);
  }

  getDisabledClass(): string {
    return this.actionItemData?.disabled ? 'disabled' : '';
  }
}


