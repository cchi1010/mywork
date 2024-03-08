import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { ArrayIsNotEmpty, cloneNewObjectByJSON, PjKeyValue } from 'src/component/components.global';
import { PJ_COMPONENT_MENU } from 'src/component-doc/pj-component.list';
import { PjSideMenuItem } from 'src/component/components.global';;
import { PathName, RoutingService } from 'src/service/routing.service';
import { PjDocumentSectionData } from './pj-document-section/pj-document-section.type';


@Component({
  selector: 'page-document',
  templateUrl: './page-document.component.html',
  styleUrls: ['./page-document.component.scss']
})
export class PageDocumentComponent {

  private _componentMenu?: Array<PjSideMenuItem>;
  private _currentComponentMenu?: PjSideMenuItem;
  private _currentComponentDoc?: Array<PjDocumentSectionData>;
  private _currentPath$ = new BehaviorSubject<string>('');

  constructor(private _routeInfo: ActivatedRoute, private _routingService: RoutingService,
    private _appCfgService: AppConfigService) { }

  ngOnInit(): void {
    this._routeInfo.paramMap.subscribe((para) => {
      this._currentPath$.next(para.get('componentName') || '');
    });
    this._componentMenu = cloneNewObjectByJSON(PJ_COMPONENT_MENU) as Array<PjSideMenuItem>;
    this._componentMenu.sort((e1, e2): number => {
      return e1.label.localeCompare(e2.label);
      // return (e1.iconName || '').localeCompare(e2.iconName || '');
    });
    // this._componentMenu.reverse();
    this._appCfgService.resetMenuItem(this._componentMenu || []);
    this._currentPath$.subscribe(componentName => {
      this._currentComponentDoc = this._getDocumentData(componentName);
      this._appCfgService.resetFocusedMenuItem(componentName, true);
    });
  }

  private _getDocumentData(compName: string): Array<PjDocumentSectionData> {
    let a: Array<PjDocumentSectionData> = [];
    PJ_COMPONENT_MENU.forEach(item => {
      if (ArrayIsNotEmpty(item['children'])) {
        item['children']?.forEach((subItem: PjKeyValue<any>) => {
          if (subItem['actionString'] === compName) {
            a = subItem['documentData'];
          }
        });
      } else {
        if (item['actionString'] === compName) {
          a = item['documentData'];
        }
      }
    });
    return a;
  }

  getCurrentComponentDocument(): Array<PjDocumentSectionData> {
    return this._currentComponentDoc || [];
  }

  onItemClick(item: PjSideMenuItem): void {
    this._routingService.gotoUrl(PathName.PJ_DOCUMENT + '/' + item.actionString || '');
  }

  getComponentMenu(): Array<PjSideMenuItem> {
    return this._componentMenu || [];
  }

  getCurrentComponentName(): string {
    return this._currentComponentMenu?.label || '';
  }
}
