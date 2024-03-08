import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pj-side-panel',
  template: ``,
  styleUrls: [],
})
export class PjSidePanelComponent implements OnInit {
  @Input()
  opened = false;

  @Input()
  whichSide: string = 'right';

  @Input()
  posistionType: 'viewheight' | 'partial' = 'partial';

  @Output()
  closed = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onBackgroundClick(): void {
    this.opened = false;
    this.closed.emit();
  }
  calcLeftPosition(): string {
    return document.body.offsetWidth - 15 + 'px';
  }

  getSidePanelClass(): string {
    return this.whichSide + ' ' + this.posistionType;
  }

  getBgState(): string {
    return this.opened ? 'nonEmpty' : 'empty';
  }

  isRightToLeftPanel(): boolean {
    if (this.opened) {
      return this.whichSide === 'right';
    }
    return false;
  }

  isLeftToRightPanel(): boolean {
    if (this.opened) {
      return this.whichSide === 'left';
    }
    return false;
  }
}
