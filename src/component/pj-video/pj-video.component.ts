import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { HasStringValue, PjProperty, PjVideoData } from 'src/component/components.global';

@Component({
  selector: 'pj-video',
  templateUrl: './pj-video.component.html',
  styleUrls: ['./pj-video.component.scss'],
})
export class PjVideoComponent implements OnInit {
  @Input()
  videoData?: PjVideoData;

  @Input()
  videoIcon?: boolean;

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _appCfgService: AppConfigService) { }

  ngOnInit(): void {
    this._appCfgService.timerEvent().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      if (this.videoData?.videoSrc) {
        this._videoFileType = this.videoData?.videoSrc
          .substring(this.videoData?.videoSrc.lastIndexOf('.') + 1);
        }
      if (this.videoData?.videoType == 'rectangle') {
        this._imageStyle = {
          width: (this.videoData?.width || 144) + 'px',
          height: (this.videoData?.height || 144) + 'px',
          'border-width': HasStringValue(this.videoData?.borderColor) ? '2px' : '0px',
        };
      } else {
        this._imageStyle = {
          width: (this.videoData?.width || 144) + 'px',
          height: (this.videoData?.width || 144) + 'px',
          'border-width': HasStringValue(this.videoData?.borderColor) ? '2px' : '0px',
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  hasLabel(): boolean {
    return HasStringValue(this.videoData?.label);
  }

  getLabel(): string {
    return this.videoData?.label || '';
  }

  getVideoSrc(): string {
    return this.videoData?.videoSrc || '';
    // return 'https://www.w3schools.com/html/mov_bbb.mp4';
  }
  private _videoFileType?: string;
  getVideoType(): string {
    return HasStringValue(this._videoFileType)? ('video/' +this._videoFileType) : 'video/mp4';
  }

  getLabelPositionClass(): string {
    let ic = this.videoData?.noMouseEffection ? 'noEvent' : '';
    ic = ic + (HasStringValue(this.videoData?.borderColor) ? (' ' + this.videoData?.borderColor) : '');
    if (this.videoData?.videoType == 'rectangle') {
      ic = ic + ' place-content-end square';
    } else {
      ic = ic + ' place-content-center items-center circle';
    }
    return ic;
  }

  private _imageStyle?: PjProperty;
  getVedioFrameStyle(): {} {
    return this._imageStyle || {};
  }
  getVedioPlayerStyle(): {} {
    return this.videoData?.videoType === 'circle' ? 'player-circle' : 'player-square';
  }
  hasBadge(): boolean {
    return this.videoData?.videoType === 'rectangle' && HasStringValue(this.videoData?.badgeLabel);
  }

  getBadgeLabel(): string {
    return this.videoData?.badgeLabel || '';
  }

  getBadgeSize(): string {
    let w = (this.videoData?.width || 0);
    if (w <= 64) {
      return 'sm';
    } else if (w <= 120) {
      return 'md';
    }
    return 'lg'
  }

  hasVideoIcon(): boolean {
    return this.videoIcon == true;
  }
}
