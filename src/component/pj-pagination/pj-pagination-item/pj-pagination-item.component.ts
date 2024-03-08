import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pj-pagination-item',
  templateUrl: './pj-pagination-item.component.html',
  styleUrls: ['./pj-pagination-item.component.scss']
})
export class PjPaginationItemComponent implements OnInit, OnChanges {

  @Input()
  iconName?= '';

  @Input()
  label?= '';

  @Input()
  disabled = false;

  @Input()
  focused = false;

  focusedClass = 'focused';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.focused) {
      this.focusedClass = 'focused';
    } else {
      this.focusedClass = '';
    }
  }

  ngOnInit(): void {
  }

  hasIcon(): boolean {
    return (this.iconName != null && this.iconName.length > 0);
  }

  hasLabel(): boolean {
    return this.hasIcon() ? false : (this.label != null && this.label.length > 0);
  }
}
