import { Component, Input } from '@angular/core';
import { PJ_COMPONENT_STYLE } from 'src/component/components.global';
import { PjTabItemComponent } from './../pj-tab-item.component';


@Component({
  selector: 'pj-tab-outlined-item',
  templateUrl: './pj-tab-outlined-item.component.html',
  styleUrls: ['./pj-tab-outlined-item.component.scss'],
})
export class PjTabOutlinedItemComponent extends PjTabItemComponent {
  @Input()
  pjColor?: string;

  getColor(): string {
    if (this.pjColor == PJ_COMPONENT_STYLE.BLACK) {
      return this.item?.isActived ? PJ_COMPONENT_STYLE.BLACK : PJ_COMPONENT_STYLE.NEUTRAL;
    }
    return this.item?.isActived ? PJ_COMPONENT_STYLE.SECONDARY : PJ_COMPONENT_STYLE.NEUTRAL;
  }
}
