import { HasStringValue } from 'src/component/components.global';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pj-autocomplete-empty',
  templateUrl: './pj-autocomplete-empty.component.html',
  styleUrls: ['./pj-autocomplete.component.scss'],
})

export class PjAutocompleteEmptyComponent implements OnInit {
  @Input()
  pjSize?: string;

  @Input()
  upperLabel?: string;

  @Input()
  lowerLabel?: string;

  @Input()
  divided?: boolean;

  @Input()
  open?: boolean;

  @Input()
  suggestItems?: Array<string>;

  @Input()
  searchHistory?: Array<string>;

  constructor() { }

  ngOnInit(): void { }

  hasDivider(): boolean {
    return this.divided || false;
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

  isOpen():
    boolean {
    return this.open || false;
  }

}
