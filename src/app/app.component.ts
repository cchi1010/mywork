import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, Subject, of, takeUntil } from 'rxjs';
import { HasStringValue } from 'src/component/components.global';
import { PjScreenItemDirective } from 'src/directive/pj-screen-item.directive';
import { StorageService } from 'src/service/storage.service';

import { AppConfigService } from './app.config';
import { APPCONSTANT, ScreenSizeBreakPoint, ScreenSizeBreakPointString } from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('stickyArea')
  private _stickyArea?: ElementRef;

  @ViewChild('contentArea')
  private _contentArea?: ElementRef;

  private _stickyHeight: number = 0;
  protected _unsubscribeAll: Subject<any> = new Subject();

  private _screenBreakPoint: string = 'xs';
  private _selfWidth: number = -1;
  private _items?: NodeList;
  constructor(private _self: ElementRef, private _appService: AppConfigService,
    private _storageService: StorageService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._appService.timerEvent().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      this._onResize();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _onResize(): void {
    const stickyHeight = this._stickyArea?.nativeElement.offsetHeight;
    if (stickyHeight >= 0 && this._stickyHeight != stickyHeight) {
      this._stickyHeight = stickyHeight;
      this._contentArea?.nativeElement.setAttribute('style', 'margin-top: ' + this._stickyHeight + 'px;');
    }

    let widthChanged = false;
    if (this._selfWidth != document.body.clientWidth) {
      this._selfWidth = document.body.clientWidth;
      this._screenBreakPoint = this._generateBreakPoint(this._selfWidth);
      this._appService.setScreenSize(this._screenBreakPoint);
      widthChanged = true;
    }
    let items: NodeList = this._self.nativeElement.parentElement.querySelectorAll(
      PjScreenItemDirective.cssSelector
    );
    let hasSizeClass: boolean = false;
    items.forEach((item: any) => {
      ScreenSizeBreakPointString.ALL.forEach(sizeClass => {
        if (item.classList.contains(sizeClass)) {
          hasSizeClass = true;
        }
      });
    });
    if (widthChanged || (this._items == null && items != null && items.length > 0)
      || (this._items != null && items != null && this._items.length != items.length)
      || !hasSizeClass) {
      this._items = items;
      items.forEach((item: any) => {
        this._appService.setElementSize(item, this._screenBreakPoint);
      });
    }
  }

  private _generateBreakPoint(size: number): string {
    if (size <= ScreenSizeBreakPoint.xsMax) {
      return 'xs';
    }
    if (size <= ScreenSizeBreakPoint.smMax) {
      return 'sm';
    }
    if (size <= ScreenSizeBreakPoint.mdMax) {
      return 'md';
    }
    if (size <= ScreenSizeBreakPoint.lgMax) {
      return 'lg';
    }
    if (size <= ScreenSizeBreakPoint.xlMax) {
      return 'xl';
    }
    if (size <= ScreenSizeBreakPoint.xxlMax) {
      return 'xxl';
    }
    return 'xxxl';
  }

  @HostListener('window:load')
  onWindowLoad(): void {
    let s = this._storageService.getLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT);
    if (HasStringValue(s)) {
      this._storageService.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT, '' + ((Number.parseInt(s || '') || 0) + 1));
    } else {
      this._storageService.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT, 1);
    }
    // navigator.geolocation.getCurrentPosition(pos => {
    //   const crd = pos.coords;
    //   let cityAPIUrl = APPCONSTANT.API_FOR_CONFIG.GEOLOCATION_CITY.replace('\#\{latitude\}', '' + crd.latitude).replace('\#\{longitude\}', '' + crd.longitude);
    //   forkJoin({
    //     city: this._httpClient.get(cityAPIUrl),
    //     ipadd: this._httpClient.get(APPCONSTANT.API_FOR_CONFIG.IP_ADDRESS)
    //   }).subscribe(value => {
    //     let ss = 'IP: ' + (value.ipadd as PjProperty)['ipString'];
    //     ss = ss + ', City: '+(value.city as PjProperty)['locality'];
    //     console.log('Your address: ' + ss);
    //     for (let key in navigator) {
    //       ss = ss + JSON.stringify((navigator as PjKeyValue<any>)[key]);
    //     }
    //     console.log(sha256(JSON.stringify(ss)).toUpperCase());
    //   });
    // }, err => { console.warn(`ERROR(${err.code}): ${err.message}`); }, {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // });
  }

  @HostListener('window:unload')
  onWindowUnload(): void {
    let s = this._storageService.getLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT);
    if (!HasStringValue(s)) {
      return;
    }
    const t = (Number.parseInt(s || '') || 0) - 1;
    if (t > 0) {
      this._storageService.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT, t);
    } else {
      this._storageService.removeLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.THREAD_AMOUNT);
    }
  }
}
