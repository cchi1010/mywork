import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HasStringValue, PJ_ACTION, PjBreadcrumbItem } from '../components.global';


@Component({
  selector: 'pj-breadcrumb',
  templateUrl: './pj-breadcrumb.component.html',
  styleUrls: ['./pj-breadcrumb.component.scss'],
})
export class PjBreadcrumbComponent implements OnInit {
  @Input()
  breadcrumbs = new Array<PjBreadcrumbItem>();

  @Output()
  actionEvent = new EventEmitter<PjBreadcrumbItem>();

  constructor() { }

  ngOnInit(): void { }

  isValidBreadcrub(item: PjBreadcrumbItem): boolean {
    if (item.id == null || item.id == 0) {
      return false;
    }
    if (!HasStringValue(item.label)) {
      return false;
    }
    if (!HasStringValue(item.path)) {
      return false;
    }
    return true;
  }
  onItemClick(item: PjBreadcrumbItem): void {
    this.actionEvent.emit(item);
  }

  getLabel(item: PjBreadcrumbItem): string {
    return item?.label || '';
  }

  onHomeIconClick(): void {
    this.actionEvent.emit({ path: PJ_ACTION.GO_HOME });
  }
}
