import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-autocomplete-item',
  templateUrl: './pj-autocomplete-item.component.html',
  styleUrls: ['./pj-autocomplete-item.component.scss'],
})
export class PjAutocompleteItemComponent implements OnInit {

  @Input()
  leftLabel?: string;

  @Input()
  midLabel?: string;

  @Input()
  rightLabel?: string;

  @Input()
  startLabel?: string;

  constructor() { }

  ngOnInit(): void { }

  getClass(): string {
    //return this.searchLabel? ' gap-4':'';
    return '';
  }

  getLeftLabel(): string {
    return this.leftLabel || '';
  }

  getMidLabel(): string {
    return this.midLabel || '';
  }

  getRightLabel(): string {
    return this.rightLabel || '';
  }
  getStartLabel(): string {
    return this.startLabel || '';
  }
}
