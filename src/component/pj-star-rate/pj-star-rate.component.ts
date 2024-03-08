import { HasStringValue } from 'src/component/components.global';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pj-star-rate',
  templateUrl: './pj-star-rate.component.html',
  styleUrls: ['./pj-star-rate.component.scss'],
})
export class PjStarRateComponent implements OnInit {
  @Input()
  focused: boolean = false;

  @Input()
  hasLabel: boolean = false;

  @Input()
  title?: string = '';

  @Input()
  label?: string = '';

  @Input()
  subLabel?: string;

  @Input()
  linkLabel?: string;

  @Input()
  rating: number = 0;

  @Input()
  editable?: boolean = false;

  @Input()
  ratingDesc?: Array<string>;// = ['The product is bad.', 'The product is okay.', 'The product is good.', 'The product is great.', 'The product is awesome!'];

  @Output()
  ratingChange = new EventEmitter<number>();

  @Output()
  ratingLinkClick = new EventEmitter<void>();
  // private _ratingDesc = ['Bad', 'Not good', 'Normal', 'Good', 'Excellent'];
  constructor() { }

  ngOnInit(): void { }

  onClick(pos: number): void {
    if (this.editable) {
      this.rating = pos;
      this.ratingChange.emit(pos);
    }
  }

  getStar(pos: number): string {
    if (this.rating && this.rating != 0) {
      if (this.rating >= pos) {
        return 'star';
      } else if (this.rating >= pos - 1 + 0.5) {
        return 'star_half';
      } else {
        return 'star_outline';
      }
    }
    return 'star';
  }

  isEditable(): boolean {
    return this.editable || false;
  }

  hasDescription(): boolean {
    if (this.editable) {
      return true;
    }
    return this.ratingDesc != null && this.ratingDesc.length == 5;
  }

  getRateDescription(): string {
    if (this.ratingDesc == null || this.ratingDesc.length != 5) {
      return '';
    }
    if (this.rating == null || this.rating == 0) {
      return '';
    }
    let r = Math.ceil(this.rating);
    if (r > 5) {
      r = 4;
    } else if (r < 1) {
      r = 1;
    }
    return this.ratingDesc[r - 1];
  }

  hasTitle(): boolean {
    return HasStringValue(this.title);
  }

  getTitle(): string {
    return this.title || '';
  }

  getFocusedClass(): string {
    return this.focused ? 'focused' : '';
  }
  getLabel(): string {
    return HasStringValue(this.label) ? this.label || '' : this.rating.toFixed(1);
  }

  getEmptyClass(): string {
    if (this.rating == null || this.rating == 0) {
      return 'empty';
    }
    return '';
  }

  hasSubLabel(): boolean {
    return HasStringValue(this.subLabel);
  }

  getSubLabel(): string {
    if (HasStringValue(this.subLabel)) {
      return '(' + this.subLabel + ')';
    }
    return this.subLabel || '';
  }

  hasLinkLabel(): boolean {
    return HasStringValue(this.linkLabel);
  }

  getLinkLabel(): string {
    return this.linkLabel || '';
  }

  onLinkClick(): void {
    this.ratingLinkClick.emit();
  }
}
