import { Component, Input } from '@angular/core';
import { PjLayoutContainerComponent } from '../pj-layout-container.component';

@Component({
  selector: 'pj-layout-flex',
  templateUrl: './pj-layout-flex.component.html',
  styleUrls: ['./pj-layout-flex.component.scss'],
})
export class PjLayoutFlexComponent extends PjLayoutContainerComponent {
  @Input()
  flexClass: string = 'flex-col';

  @Input()
  fitContent: boolean = false;

  getFlexContainerClass(): string {
    let c = this.fitContent ? 'fitContent ' : 'fullWidth ';
    c = c + this.flexClass + ' ' + this.contentBreakPoint;
    if(this.scrollSeperately) {
      c = c + ' overflow-y-auto';
    }
    return c;
  }
}
