import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { booleanValue, HasStringValue, PJ_BTN_TYPE } from 'src/component/components.global';
import { PjButtonComponent } from '../pj-button.component';
import { timer } from 'rxjs';
@Component({
  selector: 'pj-button-favorite',
  templateUrl: './pj-button-favorite.component.html',
  styleUrls: ['./pj-button-favorite.component.scss'],
})
export class PjButtonFavoriteComponent extends PjButtonComponent implements OnInit {
  @Input()
  btnType: string = PJ_BTN_TYPE.FILLED;

  @Input()
  pjColor?: string;

  @Input()
  pjSize?: string;

  @Input()
  withLabel = false;

  @Input()
  favorited?: boolean = false;

  @Output()
  focuseChanged = new EventEmitter<boolean>();

  private _focused = false;

  getBtnClass(): string {
    return (
      this.btnType +
      (this.withLabel ? ' withLabel' : ' iconOnly') +
      (this.disabled ? ' disabled' : '') +
      (this._focused ? ' focused' : '')
    );
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorited'] != null) {
      const v1 = changes['favorited'].currentValue;
      const v2 = changes['favorited'].previousValue;
      if (v1 !== v2) {
        this._focused = booleanValue(this.favorited);
      }
    }
  }
  hasLabel(): boolean {
    return this.withLabel;
  }
  getLabel(): string {
    if(this.withLabel) {
      return this._focused ? 'Unfavorite' : 'Favorite';
    }
    return '';
    
  }
  getIconName(): string {
    return this._focused ? 'favorite' : 'favorite_outline';
  }

  getIconClass(): string {
    return this._focused ? 'favorite' : '';
  }

  onFavoriteBtnClick(): void {
    this.disabled=true;
    this.focuseChanged.emit(!this._focused);
    timer(1000).subscribe(()=>{
      this.disabled=false;
    })
    
  }
}
