import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-text-item',
  templateUrl: './pj-text-item.component.html',
  styleUrls: ['./pj-text-item.component.scss']
})
export class PjTextItemComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  description = '';

  @Input()
  focused = false;

  constructor() { }

  ngOnInit(): void {
  }

  hasTitle(): boolean {
    return (this.title != null && this.title.length > 0);
  }
  hasDescription(): boolean {
    return (this.description != null && this.description.length > 0);
  }
}
