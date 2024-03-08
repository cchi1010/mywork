import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-keyword',
  templateUrl: './pj-keyword.component.html',
  styleUrls: ['./pj-keyword.component.scss']
})
export class PjKeywordComponent implements OnInit {

  @Input()
  keyword?: string;

  @Input()
  candidatedWord?: string;

  @Input()
  forHistory: boolean = false;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  private _keywordLen?: number;
  private _keywordFirstPos?: number;
  private _wordBeforeKeyword?: string;
  private _wordAfterKeyword?: string;
  private _rightGap?: string;
  private _leftGap?: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.keyword != null && this.candidatedWord != null) {
      this.keyword = this.keyword?.trim().toLowerCase();
      this._keywordLen = this.keyword?.length || 0;
      this._keywordFirstPos = this.candidatedWord?.toLowerCase().indexOf(this.keyword);
      this._wordBeforeKeyword = this.candidatedWord.substring(0, this._keywordFirstPos).trim();
      this._wordAfterKeyword = this.candidatedWord.substring(this._keywordFirstPos + this._keywordLen).trim();
      this._rightGap = '';

      if ((this.candidatedWord.substring(0, this._keywordFirstPos).length - this._wordBeforeKeyword.length) > 0) {
        this._rightGap = 'mr-1';
      }
      if ((this.candidatedWord.substring(this._keywordFirstPos + this._keywordLen).length - this._wordAfterKeyword.length) > 0) {
        this._leftGap = 'ml-1';
      }
    }
  }

  getKeyword(): string {
    return this.keyword || '';
  }

  getWordBeforeKeyword(): string {
    return this._wordBeforeKeyword || '';
  }

  getWordAfterKeyword(): string {
    return this._wordAfterKeyword || '';
  }

  getRightGap(): string {
    return this._rightGap || '';
  }

  getLeftGap(): string {
    return this._leftGap || '';
  }

  onClearBtnClick(event: Event): void {
    event.preventDefault();
    this.actionClick.emit({ actionString: PJ_ACTION.REMOVE, para: { keyword: this.candidatedWord } });
  }

  onKeywordClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.DETAIL, para: { keyword: this.candidatedWord } });
  }

  onKeywordMouseDown(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.DETAIL });
  }

  isForHistory(): boolean {
    return this.forHistory;
  }
}
