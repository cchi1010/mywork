import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pj-chip-input',
  templateUrl: './pj-chip-input.component.html',
  styleUrls: ['./pj-chip-input.component.scss'],
})
export class PjChipInputComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  selected = false;

  @Output()
  closeClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  hasClose(): boolean {
    return this.selected;
  }
  getChipClass(): string {
    return this.selected ? 'withClose' : '';
  }
  onCloseBtnClick(): void {
    this.closeClicked.emit();
  }
}
