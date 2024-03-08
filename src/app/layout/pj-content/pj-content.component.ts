import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppLayoutService } from 'src/app/app-layout.service';
import { PJ_ACTION, PjBreadcrumbItem } from 'src/component/components.global';
import { PathName, RoutingService } from 'src/service/routing.service';

@Component({
  selector: 'pj-content',
  templateUrl: './pj-content.component.html',
  styleUrls: ['./pj-content.component.scss']
})
export class PjContentComponent implements OnInit {

  constructor(private _layoutService: AppLayoutService, private _routingService: RoutingService,
    private _cdRef: ChangeDetectorRef) { }

  private _hasbreadcrumbs: boolean = false;
  private _breadcrumbs: PjBreadcrumbItem[] = [];
  ngOnInit(): void { }

  ngAfterViewChecked(): void {
    let b = this._layoutService.hasBreadcrumbs();
    if (b !== this._hasbreadcrumbs) {
      this._hasbreadcrumbs = b;
      this._cdRef.detectChanges();
    }

    let bItems = this._layoutService.currentBreadcrumbs();
    if (bItems != this._breadcrumbs) {
      this._breadcrumbs = bItems;
      this._cdRef.detectChanges();
    }
  }

  hasBreadcrumbs(): boolean {
    return this._hasbreadcrumbs;
  }

  getBreadcrumbs(): PjBreadcrumbItem[] {
    return this._breadcrumbs;
  }

  onActionEvent(breadcrumb: PjBreadcrumbItem): void {
    if (breadcrumb.path === PJ_ACTION.GO_HOME) {
      this._routingService.gotoHomePage();
    } else {
      this._routingService.gotoUrl(breadcrumb.path || PathName.COMING_SOON);
    }
  }
}
