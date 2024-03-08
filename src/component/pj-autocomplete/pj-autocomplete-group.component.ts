import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue, PjShopItem } from 'src/component/components.global';
import { ArrayIsEmpty, PJ_ACTION, PjActionEvent } from '../components.global';


@Component({
  selector: 'pj-autocomplete-group',
  templateUrl: './pj-autocomplete-group.component.html',
  styleUrls: ['./pj-autocomplete-group.component.scss'],
})

export class PjAutocompleteGroupComponent implements OnInit {
  @Input()
  pjSize?: string;
  @Input()
  datasource?: Array<any>;
  @Input()
  aimProperty?: string;
  @Input()
  secondAimProperty?: string;
  constructor() { }

  ngOnInit(): void { }

  searchKeyword: string = '';
  results?: Array<string>;
  shopresults?: Array<PjShopItem>;

  onSearchBarActionClick(actionEvent: PjActionEvent): void {
    if (actionEvent.para == null || actionEvent.para['keyword'] == null) {
      return;
    }
    if (actionEvent.actionString === PJ_ACTION.SEARCH_KEYWORD_CHANGED) {
      this.searchKeyword = actionEvent.para['keyword'];
    }
  }

  getSearchItem(): string {
    return this.searchKeyword;
  }

  getResults(): Array<string> {
    let tempProductResutls: Array<string> = [];
    if (this.datasource && this.datasource?.length > 0 && this.aimProperty) {
      for (let i = 0; i < this.datasource.length; i++) {
        if (this.datasource[i][this.aimProperty].toLocaleLowerCase().indexOf(this.searchKeyword.toLocaleLowerCase()) >= 0) {
          tempProductResutls.push(this.datasource[i][this.aimProperty]);
        }
        if (tempProductResutls.length >= 10) {
          break;
        }
      }
    }

    this.results = tempProductResutls;
    return this.results || [];
  }

  private _shopItems: Array<PjShopItem> = [{ shopName: 'Powerful computer shop', sponsoredLabel: 'Sponsored' },
  { shopName: 'Beautiful computer shop', sponsoredLabel: 'High rating' },
  { shopName: 'Useful computer shop', sponsoredLabel: '' }]

  getShopItem(): Array<PjShopItem> {
    let tempShopResutls: Array<PjShopItem> = [];
    if (this.datasource && this.datasource.length > 0 && this.secondAimProperty) {
      for (let i = 0; i < this.datasource.length; i++) {
        if (this.datasource[i][this.secondAimProperty].toLocaleLowerCase().indexOf(this.searchKeyword.toLocaleLowerCase()) >= 0) {
          tempShopResutls.push({ shopName: this.datasource[i][this.secondAimProperty], sponsoredLabel: '' });
        }
        if (tempShopResutls.length >= 2) {
          break;
        }
      }
    }

    this.shopresults = tempShopResutls;

    return this.shopresults || [];
  }
  // private _autoCompleteimages?: Array<PjImageData>;
  // private _autoCompleteInitialImages(): void {
  //   this._autoCompleteimages = new Array<PjImageData>();
  //   this._autoCompleteimages.push({ imageSrc: 'assets/image/heart.png', width: 270, height: 192,imageType: 'rectangle', label: 'Dog01' });
  //   this._autoCompleteimages.push({ imageSrc: 'assets/image/lock.png', width: 270, height: 192,imageType: 'rectangle', label: 'Dog02' });
  //   this._autoCompleteimages.push({ imageSrc: 'assets/image/life_ring.png', width: 270, height: 192,imageType: 'rectangle', label: 'Cat' });
  // }

  isOpen(): boolean {
    return HasStringValue(this.searchKeyword);
  }

  getUpperLabel(): string {
    if (ArrayIsEmpty(this.results)) {
      return "";
    } else {
      return "PRODUCTS";
    }
  }

  getLowerLabel(): string {
    return this.shopresults ? "SHOPS" : "";
  }

  hasDivider(): boolean {
    if (ArrayIsEmpty(this.shopresults)) {
      return false;
    } else {
      return true;
    }
  }

  // filterProducts(textToSearch:string):void{
  //   let tempProductResutls:Array<string>=[];
  //   for(let i=0;i<PRODUCTS.length;i++){
  //     if(PRODUCTS[i].name.toLowerCase().indexOf(textToSearch.toLowerCase())!=-1){
  //       tempProductResutls.push(PRODUCTS[i].name);       
  //     }
  //     if(tempProductResutls.length>=10){
  //       break;
  //     }
  //   }
  //   this.results=tempProductResutls;
  // }

}
