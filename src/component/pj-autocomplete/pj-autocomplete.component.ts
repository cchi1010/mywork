import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PjImageData, PjShopItem } from 'src/component/components.global';


@Component({
  selector: 'pj-autocomplete',
  templateUrl: './pj-autocomplete.component.html',
  styleUrls: ['./pj-autocomplete.component.scss'],
})

export class PjAutocompleteComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  resultItems?: Array<string>;

  @Input()
  searchItem?: string;

  @Input()
  shopItem?: Array<PjShopItem>;

  @Input()
  promotion?: boolean;

  @Input()
  promotionImages?: Array<PjImageData>;

  @Input()
  upperLabel?: string;

  @Input()
  lowerLabel?: string;

  @Input()
  divided?: boolean;

  @Input()
  suggestItems?: Array<string>;

  @Input()
  open?: boolean;

  constructor() { }

  ngOnInit(): void { }

  getMidLabel(item: string): string {
    if (this.searchItem != null && item != null) {
      let start = item.toLocaleLowerCase().indexOf(this.searchItem.toLocaleLowerCase());
      return item.substring(start + this.searchItem.length);
    } else {
      return item || '';
    }
  }

  getStartLabel(item: string): string {
    if (this.searchItem != null && item != null) {
      let start = item.toLocaleLowerCase().indexOf(this.searchItem.toLocaleLowerCase());
      return item.substring(0, start);
    } else {
      return item || '';
    }
  }

  getLeftLabel(): string {
    return this.searchItem || '';
  }

  getNoResult(): string {
    return (' "' + this.searchItem + '"') || '';
  }

  getShopLabel(item: PjShopItem): string {
    return item.shopName || '';
  }

  getSponsoredLabel(item: PjShopItem): string {
    return item.sponsoredLabel || '';
  }

  hasDivider(): boolean {
    return this.divided || false;
  }

  hasPromotion(): boolean {
    return this.promotion || false;
  }

  getClass(): string {
    return this.promotion ? ' promtion' : '';
  }

  getLabelUpper(): string {
    return this.upperLabel || '';
  }

  getLabelLower(): string {
    return this.lowerLabel || '';
  }

  hasLabelUpper(): boolean {
    return HasStringValue(this.upperLabel);
  }

  hasLabelLower(): boolean {
    return HasStringValue(this.lowerLabel);
  }

  isEmpty(): boolean {
    return !(this.resultItems == null || this.resultItems.length > 0) ;
  }

  isOpen():
    boolean {
    return this.open || false;
  }
}
