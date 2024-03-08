import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjImageData, PjImageTypeConst } from 'src/component/components.global';

@Component({
  selector: 'pj-chip-filter',
  templateUrl: './pj-chip-filter.component.html',
  styleUrls: ['./pj-chip-filter.component.scss'],
})
export class PjChipFilterComponent implements OnInit {
  @Input()
  imageSrc = '';

  @Input()
  label = '';

  @Input()
  quantity: number = -1;

  @Input()
  selected: boolean = false;

  @Output()
  filterChanged = new EventEmitter<boolean>();

  private _focused = false;

  private _hasImage = false;
  private _size = 'sm';

  constructor() {}

  ngOnInit(): void {
    this._hasImage = this.imageSrc != null && this.imageSrc.length > 0;
    if (this._hasImage) {
      this._size = 'lg';
    } else {
      this._size = 'sm';
    }
    this._focused = this.selected;
  }

  getChipClass(): string {
    return this._size + (this._focused ? ' focused' : '');
  }

  hasImage(): boolean {
    return this._hasImage;
  }

  hasQuantity(): boolean {
    return this.quantity > 0;
  }

  hasClose(): boolean {
    return this._focused;
  }

  onClick(event: MouseEvent): void {
    this._focused = !this._focused;
    this.filterChanged.emit(this._focused);
    // if (this._focused==false){
    //   event.stopPropagation();
    // }   
  }

  getImageData(): PjImageData {
    return {
      imageSrc: this.imageSrc,
      width: 32, height: 32,
      imageType: PjImageTypeConst.CIRCLE,
      noMouseEffection: true
    }
  }
}