import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjAction, PjProperty, PjVideoData } from 'src/component/components.global';



@Component({
  selector: 'pj-video-manage',
  templateUrl: './pj-video-manage.component.html',
  styleUrls: ['./pj-video-manage.component.scss'],
})
export class PjVideoManageComponent implements OnInit {
  @Input()
  videoData?: PjVideoData; // 图片的链接

  @Input()
  label?: string;

  @Input()
  actionLocation: string = 'corner';

  @Input()
  action1?: PjAction;

  @Output()
  action1Click = new EventEmitter<void>();

  @Input()
  action2?: PjAction;

  @Output()
  action2Click = new EventEmitter<void>();

  @Input()
  statusAdded = false;

  private _hovered = false;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.videoData != null) {
      this.videoData.videoType = 'rectangle';
      if (this.videoData.width == null) {
        this.videoData.width = 144;
      }
      if (this.videoData.height == null) {
        this.videoData.height = 144;
      }
    }
  }
  onMouseEnter(): void {
    this._hovered = true;
  }

  onMouseLeave(): void {
    this._hovered = false;
  }

  getVideoManagementClass(): string {
    let imClass = this.statusAdded ? 'statusAdded' : '';
    if (!this.hasVideo()) {
      imClass = 'pedding';
    }
    return imClass;
  }

  getComponentStyle(): PjProperty {
    let _style: PjProperty = {};
    if (this.videoData != null) {
      _style['width'] = ((this.videoData.width || 144) + 4) + 'px';
      _style['height'] = ((this.videoData.height || 144) + 4) + 'px';
    }
    return _style;
  }
  hasVideo(): boolean {
    return this.videoData != null;
  }

  getMask(): string {
    return this._hovered ? 'hoverOn' : '';
  }
  isCornerLocation(): boolean {
    return this.actionLocation == 'corner';
  }

  showCenterActionButton(): boolean {
    if (this.isCornerLocation()) {
      return false;
    }
    return this._hovered;
  }

  hasAction1(): boolean {
    return this.action1 != null;
  }
  getAction1IconName(): string {
    return this.action1?.iconName || 'delete';
  }

  getAction1Label(): string {
    return this.action1?.label || 'delete';
  }

  hasAction2(): boolean {
    return this.action2 != null;
  }

  getAction2IconName(): string {
    return this.action2?.iconName || 'delete';
  }

  getAction2Label(): string {
    return this.action2?.label || 'delete';
  }

  getVideoData(): PjVideoData {
    if (this.videoData == null) {
      return {};
    }
    return this.videoData;
  }

  onAction1BtnClick(): void {
    this.action1Click.emit();
  }

  onAction2BtnClick(): void {
    this.action2Click.emit();
  }
}
