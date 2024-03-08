import { Component, Input, OnInit } from '@angular/core';
import { PjDataLabelValue } from '../components.global';

@Component({
  selector: 'pj-data-label-value',
  templateUrl: './pj-data-label-value.component.html',
  styleUrls: ['./pj-data-label-value.component.scss'],
})
export class PjDataLabelValueComponent implements OnInit {
  @Input()
  isEmphasis?: boolean = false;

  @Input()
  title?: string;

  @Input()
  labelValues?: Array<PjDataLabelValue>;
  constructor() {}

  ngOnInit(): void {}

  hasTitle(): boolean {
    return ((this.title != null) && (this.title.length > 0));
  }

  getEmphasisClass(): string {
    return this.isEmphasis ? 'emphasis' : '';
  }
}
