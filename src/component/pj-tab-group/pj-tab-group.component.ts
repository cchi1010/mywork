import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { skip, take } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { PJ_ALIGN_TYPE, PJ_SIZE, PjTabItemData, PjTabType, PjTabTypeConst } from '../components.global';


@Component({
  selector: 'pj-tab-group',
  templateUrl: './pj-tab-group.component.html',
  styleUrls: ['./pj-tab-group.component.scss'],
})
export class PjTabGroupComponent implements OnInit {
  @Input()
  itemsAlignType?: string = PJ_ALIGN_TYPE.CENTER;
  
  @Input()
  tabType: PjTabType = PjTabTypeConst.TEXT;

  @Input()
  tabItemsData: Array<PjTabItemData> = [];

  @Input()
  pjSize: string = PJ_SIZE.LARGE;

  @Input()
  pjColor?: string;



  @Output()
  tabItemClick = new EventEmitter<PjTabItemData>();

  private _isInitialized = false;

  constructor(private _appCfgService: AppConfigService) { }

  ngOnInit(): void {
    this._isInitialized = false;
    this._appCfgService
      .timerEvent()
      .pipe(skip(1), take(1))
      .subscribe(() => {
        this._isInitialized = true;
      });
  }

  isActived(tabItem: PjTabItemData): boolean {
    if (!this._isInitialized) {
      return false;
    }
    if (tabItem.contentTemplateRef == null) {
      return false;
    }
    return tabItem.isActived || false;
  }

  onTitleClick(event: MouseEvent, tabItem: PjTabItemData): void {
    event.stopPropagation();
    this.tabItemsData.forEach((item) => (item.isActived = false));
    tabItem.isActived = true;
    this.tabItemClick.emit(tabItem);
  }

  getTabContent(tabItem: PjTabItemData): TemplateRef<any> | null {
    return tabItem.contentTemplateRef || null;
  }

  getItemSize(): string {
    return this.pjSize;
  }

  getTanGroupClass(): string {
    let compClass = '';
    if (this.tabType == 'underlined') {
      compClass = 'gap-6';
    }
    if (this.tabType == 'pill') {
      compClass = 'gap-2';
    }
    if (this.tabType == 'outlined') {
      compClass = 'gap-2';
    }
    switch(this.itemsAlignType) {
      case PJ_ALIGN_TYPE.CENTER: compClass = compClass + ' justify-center'; break;
      case PJ_ALIGN_TYPE.LEFT: compClass = compClass + ' justify-start'; break;
      case PJ_ALIGN_TYPE.RIGHT: compClass = compClass + ' justify-end'; break;
      default: compClass = compClass + ' justify-center'; break;
    }
    return compClass;
  }

}
