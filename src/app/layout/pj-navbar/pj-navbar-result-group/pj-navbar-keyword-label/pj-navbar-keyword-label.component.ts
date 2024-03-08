import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-navbar-keyword-label',
  templateUrl: './pj-navbar-keyword-label.component.html',
  styleUrls: ['./pj-navbar-keyword-label.component.scss']
})
export class PjNavbarKeywordLabelComponent implements OnInit {

  @Input()
  keyword?: string;

  @Input()
  candidatedWord?: string;

  private _keywordLen?: number;
  private _wordLen?: number;
  private _wordBehindKeyword?: string;
  private _wordBeforeKeyword?: string;
  private _keyword?: string;
  private _leftGap?: string;
  private _rightGap?: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.keyword = this.keyword?.trim().toLowerCase();
    if (this.keyword == null || this.keyword.length == 0) {
      return;
    }
    let _keywordIndex: number = this.candidatedWord?.toLowerCase().indexOf(this.keyword) || 0;
    if (_keywordIndex !== -1) {
      this._keywordLen = this.keyword.length;
      this._keyword = this.candidatedWord?.slice(_keywordIndex, _keywordIndex + this._keywordLen).trim();
    } else {
      this._keyword = '';
      this._keywordLen = 0;
    }
    this._wordLen = this.candidatedWord?.length || 0;
    this._wordBehindKeyword = this.candidatedWord?.slice(_keywordIndex + this._keywordLen);
    this._wordBeforeKeyword = this.candidatedWord?.slice(0, _keywordIndex);
    this._leftGap = '';
    this._rightGap = '';
    if(this._wordBehindKeyword?.length!=this._wordBehindKeyword?.trim().length) {
      this._wordBehindKeyword = this._wordBehindKeyword?.trim();
      this._leftGap = 'ml-1';
    }
    if(this._wordBeforeKeyword?.length!=this._wordBeforeKeyword?.trim().length) {
      this._wordBeforeKeyword = this._wordBeforeKeyword?.trim();
      this._rightGap = 'mr-1';
    }
  }

  getKeyword(): string {
    return this._keyword || '';
  }

  getWordBeforeKeyword(): string {
    return this._wordBeforeKeyword || '';
  }
  getWordBehindKeyword(): string {
    return this._wordBehindKeyword || '';
  }

  getLeftGap(): string {
    return this._leftGap || '';
  }

  getRightGap(): string {
    return this._rightGap || '';
  }
}
