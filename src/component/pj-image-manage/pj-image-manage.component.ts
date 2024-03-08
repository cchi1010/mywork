import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjAction, PjProperty, PjImageData, PjImageTypeConst } from '../components.global';

@Component({
  selector: 'pj-image-manage',
  templateUrl: './pj-image-manage.component.html',
  styleUrls: ['./pj-image-manage.component.scss'],
})
export class PjImageManageComponent implements OnInit {
  @Input()
  imageData?: PjImageData; // 图片的链接

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
    if (this.imageData != null) {
      this.imageData.imageType = PjImageTypeConst.RECTANGLE;
      if (this.imageData.width == null) {
        this.imageData.width = 144;
      }
      if (this.imageData.height == null) {
        this.imageData.height = 144;
      }
    }
  }
  onMouseEnter(): void {
    this._hovered = true;
  }

  onMouseLeave(): void {
    this._hovered = false;
  }

  getImageManagementClass(): string {
    let imClass = this.statusAdded ? 'statusAdded' : '';
    if (!this.hasImage()) {
      imClass = 'pedding';
    }
    return imClass;
  }

  getComponentStyle(): PjProperty {
    let _style: PjProperty = {};
    if (this.imageData != null) {
      _style['width'] = ((this.imageData.width || 144) + 4) + 'px';
      _style['height'] = ((this.imageData.height || 144) + 4) + 'px';
    }
    return _style;
  }
  hasImage(): boolean {
    return this.imageData != null;
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

  getImageData(): PjImageData {
    if (this.imageData == null) {
      return {};
    }
    return this.imageData;
  }

  onAction1BtnClick(): void {
    this.action1Click.emit();
  }

  onAction2BtnClick(): void {
    this.action2Click.emit();
  }
}
