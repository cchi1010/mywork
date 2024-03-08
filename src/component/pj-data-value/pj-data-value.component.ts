import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-data-value',
  templateUrl: './pj-data-value.component.html',
  styleUrls: ['./pj-data-value.component.scss'],
})
export class PjDataValueComponent implements OnInit {
  @Input()
  title?: string;

  @Input()
  values?: Array<string>;

  constructor() {}

  ngOnInit(): void {}

  hasTitle(): boolean {
    return ((this.title != null) && (this.title.length > 0));
  }
}
