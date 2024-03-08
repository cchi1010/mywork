import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, timer } from 'rxjs';
import { ArrayIsNotEmpty, PjActionEvent, PJ_ACTION, PJ_SIZE } from '../components.global';

@Component({
  selector: 'pj-search-bar',
  templateUrl: './pj-search-bar.component.html',
  styleUrls: ['./pj-search-bar.component.scss']
})
export class PjSearchBarComponent implements OnInit {

  @Input()
  pjSize?: string;

  @Input()
  showBackBtnAfterSearching: boolean = false;

  @Input()
  candidatedKeywords?: Array<string>;

  @Input()
  dropdownWhenFocused: boolean = false;

  @Input()
  forHistory: boolean = false;

  private _dropdownKeywords?: Array<string>;

  @Input()
  asyncKeywordSearching: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @Input()
  placeHolder?: string = 'Searching everything ... ';

  inputContent = new UntypedFormControl('');

  private _hasBackBtn: boolean = false;

  private _clearBtnVisible = false;
  private _focused = false;
  private _holdKeywordItem: boolean = false;
  private _doubleFocusOut: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.dropdownWhenFocused) {
      this._dropdownKeywords = this.candidatedKeywords;
    }
    this.inputContent.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      if (value != null && value.length >= 0) {
        if (value.length == 0) {
          if (this.dropdownWhenFocused) {
            this._dropdownKeywords = this.candidatedKeywords;
          }
        } else {
          this._clearBtnVisible = true;
          if (ArrayIsNotEmpty(this.candidatedKeywords) && !this.asyncKeywordSearching) {
            this._dropdownKeywords = this.candidatedKeywords?.filter(v => v.toLowerCase().startsWith(value.toLowerCase()));
          }
        }
      } else {
        this._dropdownKeywords = [];
        this._clearBtnVisible = false;
      }
      if (this.asyncKeywordSearching) {
        this.actionClick.emit({ actionString: PJ_ACTION.SEARCH_ASYNC_KEYWORD_CHANGED, para: { keyword: value } });
      }
    });
  }

  ngOnChanges(): void {
    if (this.asyncKeywordSearching) {
      this._dropdownKeywords = this.candidatedKeywords;
    }
  }

  onInputFocus(elm: HTMLInputElement): void {
    this._focused = true;
    elm.focus();
    elm.select();
    this._doubleFocusOut = 0;
  }

  onInputFocuseOut(): void {
    this._doubleFocusOut++;
    if (this._doubleFocusOut >= 2) {
      this._focused = false;
    } else {
      if (!this._holdKeywordItem) {
        timer(200).subscribe(() => { this._doubleFocusOut = 0; this._focused = false });
      }
    }
  }

  onEscapeKeydown(): void {
    this._doubleFocusOut++;
    if (this._doubleFocusOut >= 2) {
      this._focused = false;
    } else {
      if (!this._holdKeywordItem) {
        timer(200).subscribe(() => { this._doubleFocusOut = 0; this._focused = false });
      }
    }
  }
  getFocusedClass(): string {
    return this._focused ? 'focused' : '';
  }
  onClearBtnClick(): void {
    this._clearBtnVisible = false;
    this.inputContent.setValue('');
    this.actionClick.emit({actionString: PJ_ACTION.CLEAR});
  }

  onSearchBtnClick(elm: HTMLInputElement): void {
    this._hasBackBtn = true;
    this.actionClick.emit({ actionString: PJ_ACTION.SEARCH_KEYWORD_CHANGED, para: { keyword: this.inputContent.value } });
    elm.select();
  }

  getBtnSize(): string {
    return this.pjSize || PJ_SIZE.SMALL;
  }

  getClearBtnClass(): string {
    return this._clearBtnVisible ? 'visible' : 'invisible';
  }

  getBackBtnSize(): string {
    let s = PJ_SIZE.MEDIUM;
    if (this.pjSize == PJ_SIZE.MEDIUM) {
      s = PJ_SIZE.LARGE;
    } else if (this.pjSize == PJ_SIZE.LARGE) {
      s = PJ_SIZE.EXTRA_LARGE;
    }
    return s;
  }

  hasBackBtn(): boolean {
    if (!this.showBackBtnAfterSearching) {
      return false;
    }
    return this._hasBackBtn;
  }

  onbackBtnClick(): void {
    this._hasBackBtn = false;
    this.inputContent.setValue('');
    this.actionClick.emit({ actionString: PJ_ACTION.SEARCH_BACK_BTN_CLICK });
  }

  hasSearchResult(): boolean | undefined {
    return ArrayIsNotEmpty(this._dropdownKeywords) && this._focused;
  }

  getCandidatedWords(): Array<string> {
    return this._dropdownKeywords || [];
  }

  getKeyword(): string {
    return this.inputContent.value;
  }

  getPlaceHolder(): string {
    return this.placeHolder || '';
  }

  onKeywordRemoveBtnClick(actionEvent: PjActionEvent): void {
    if (actionEvent.actionString === PJ_ACTION.DETAIL) {
      if (actionEvent.para != null) {
        const keyword = actionEvent.para['keyword'];
        this.inputContent.setValue(keyword);
        this.actionClick.emit({ actionString: PJ_ACTION.SEARCH_KEYWORD_CHANGED, para: { keyword: keyword } });
        this._holdKeywordItem = false;
        this.onInputFocuseOut();
      } else {
        this._holdKeywordItem = true;
      }
    } else {
      this.actionClick.emit(actionEvent);
    }
  }

  isForHistory(): boolean {
    return this.forHistory;
  }
}
