import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-action-button',
  templateUrl: './pj-action-button.component.html',
  styleUrls: ['./pj-action-button.component.scss'],
})
export class PjActionButtonComponent implements OnInit {
  @Input()
  label?: string;

  private _iconFocused: string = '';

  constructor() {}

  ngOnInit(): void {}

  onIconClick(): void {
    if (this._iconFocused.length === 0) {
      this._iconFocused = 'focused';
    } else {
      this._iconFocused = '';
    }
  }

  getIconFocusedClass(): string {
    return this._iconFocused;
  }
}
