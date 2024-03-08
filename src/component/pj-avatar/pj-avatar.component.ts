import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PjKeyValue, PjImageData } from '../components.global';


@Component({
  selector: 'pj-avatar',
  templateUrl: './pj-avatar.component.html',
  styleUrls: ['./pj-avatar.component.scss'],
})
export class PjAvatarComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  imageSrc = '';

  @Input()
  initial = 'AM'; // 没有提供大头贴时候，显示的文字

  @Input()
  hasNotification: boolean = false;

  @Input()
  online: boolean | null = null;

  @Input()
  imageIcon: boolean | null = null;

  private _imageSizes: PjKeyValue<number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 80,
    xxl: 144,
  };
  private _imageBorder: PjKeyValue<string> = {
    xs: "1px solid #FFFFFF",
    sm: "1px solid #FFFFFF",
    md: "2px solid #FFFFFF",
    lg: "2px solid #FFFFFF",
    xl: "4px solid #FFFFFF",
    xxl: "4px solid #FFFFFF",
  };

  constructor() { }

  ngOnInit(): void { }

  hasImage(): boolean {
    return this.imageSrc != null && this.imageSrc.length > 0;
  }

  getInitial(): string {
    return this.initial;
  }

  getNotificationClass(): string {
    return this.hasNotification ? 'on' : 'off';
  }

  getStatusClass(): string {
    return this.online ? 'online' : 'offline';
  }

  hasOnlineIcon(): boolean {
    return this.online != null;
  }

  hasImageIcon(): boolean {
    return this.imageIcon != null;
  }

  private _imageData?: PjImageData;
  getAvatarImageData(): PjImageData {
    if (this._imageData == null && HasStringValue(this.imageSrc)) {
      this._imageData = {
        imageSrc: this.imageSrc,
        width: this._imageSizes[this.pjSize || ''],
      };
    }
    return this._imageData || {};
  }
}
