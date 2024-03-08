import { Component, EventEmitter, Output } from '@angular/core';
import { PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-search-history',
  templateUrl: './pj-search-history.component.html',
  styleUrls: ['./pj-search-history.component.scss'],
  host: { 'class': 'flex flex-row items-center gap-4' }
})
export class PjSearchHistoryComponent {

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  onClearHistoryBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.REMOVE_ALL });
  }
}