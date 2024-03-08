import { Component, Input } from '@angular/core';
import { HasStringValue } from 'src/component/components.global';
import { PjLayoutContainerComponent } from '../pj-layout-container.component';

@Component({
  selector: 'pj-layout-grid',
  templateUrl: './pj-layout-grid.component.html',
  styleUrls: ['./pj-layout-grid.component.scss'],
})
export class PjLayoutGridComponent extends PjLayoutContainerComponent {
  @Input()
  gridClass?: string;

  getGridClass(): string {
    let gridClass = '';
    if(HasStringValue(this.gridClass)) {
      gridClass = ' ' + this.gridClass;
    }
    if(this.scrollSeperately) {
      gridClass = gridClass + ' overflow-y-auto';
    }
    return this.contentBreakPoint + gridClass;
  }
}
