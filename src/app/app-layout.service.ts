import { ComponentRef, ElementRef, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { ArrayIsNotEmpty, HasStringValue, PjBreadcrumbItem, PjKeyValue } from 'src/component/components.global';
import { environment } from 'src/environments/environment';
import { ComponentService } from 'src/service/component.service';

@Injectable({
  providedIn: 'root',
})
export class AppLayoutService {
  private _layoutElmRef: PjKeyValue<ElementRef> = {};
  private _layoutComponentRef: PjKeyValue<ComponentRef<any>> = {};

  constructor(private _compService: ComponentService) { }
  private _enabled: PjKeyValue<boolean> = {
    header: true,
    toolbar: true,
    navbar: environment.enableNav,
    footer: environment.enableFooter,
  };

  private _opened: PjKeyValue<boolean> = {
    header: true,
    toolbar: true,
    navbar: false,
    footer: false,
  };

  private _navbarType: string = 'overlay';

  isOverlayNavbar(): boolean {
    return this._navbarType == 'overlay';
  }

  toggleNavbarType(): void {
    if (this.isOverlayNavbar()) {
      this._navbarType = 'fluid';
    } else {
      this._navbarType = 'overlay';
    }
  }

  isEnabled(elm: string): boolean {
    return this._enabled[elm];
  }

  // 当前页面需要的外观组件元素，其他的全部关闭
  enable(elmNames: Array<string>): void {
    for (let elm in this._enabled) {
      this._enabled[elm] = false;
    }
    for (let elmName of elmNames) {
      if (this._enabled[elmName] == null) {
        continue;
      }
      this._enabled[elmName] = true;
    }
  }

  // 当前页面“不”需要的外观组件元素，其他的全部需要
  disable(elmNames: Array<string>): void {
    for (let elm in this._enabled) {
      this._enabled[elm] = true;
    }
    for (let elmName of elmNames) {
      if (this._enabled[elmName] == null) {
        continue;
      }
      this._enabled[elmName] = false;
    }
  }

  private _currentBreadcrumbs: PjBreadcrumbItem[] = [];
  setCurrentBreadcrumbs(breadcrumbs: PjBreadcrumbItem[]): void {
    this._currentBreadcrumbs = breadcrumbs;
  }

  hasBreadcrumbs(): boolean {
    return ArrayIsNotEmpty(this._currentBreadcrumbs);
  }
  currentBreadcrumbs(): PjBreadcrumbItem[] {
    return this._currentBreadcrumbs;
  }

  isOpened(elm: string): boolean {
    if (this._enabled[elm]) {
      return this._opened[elm];
    }
    return false;
  }

  private _layoutElmOpened$ = new BehaviorSubject<PjKeyValue<boolean>>(this._opened);
  layoutElmOpened(): Observable<PjKeyValue<boolean>> {
    return this._layoutElmOpened$.pipe(debounceTime(200));
  }

  setLayoutElmRef(elmName: string, elm: ElementRef): void {
    if (HasStringValue(elmName) && elm != null) {
      this._layoutElmRef[elmName] = elm;
    }
  }

  attachToolbarComponent(componentType: Type<any>, componentData: any): ComponentRef<any> | null {
    return this._attachLayoutComponent(LayoutElmName.TOOLBAR, componentType, componentData);
  }

  detachToolbarComponent(): void {
    this._detachLayoutComponent(LayoutElmName.TOOLBAR);
  }

  attachHeaderComponent(componentType: Type<any>, data?: any): ComponentRef<any> | null {
    return this._attachLayoutComponent(LayoutElmName.HEADER, componentType, data);
  }

  detachHeaderComponent(): void {
    this._detachLayoutComponent(LayoutElmName.HEADER);
  }

  attachFooterComponent(componentType: Type<any>,componentData?: any): ComponentRef<any> | null {
    return this._attachLayoutComponent(LayoutElmName.FOOTER, componentType,componentData);
  }

  detachFooterComponent(): void {
    this._detachLayoutComponent(LayoutElmName.FOOTER);
  }

  attachNavbarComponent(componentType: Type<any>): ComponentRef<any> | null {
    return this._attachLayoutComponent(LayoutElmName.NAVBAR, componentType);
  }

  detachNavbarComponent(): void {
    this._detachLayoutComponent(LayoutElmName.NAVBAR);
  }

  private _attachLayoutComponent(elmName: string, componentType: Type<any>, componentData?: any): ComponentRef<any> | null {
    const outerElmRef: ElementRef = this._layoutElmRef[elmName];
    if (outerElmRef == null) {
      return null;
    }
    outerElmRef.nativeElement.innerHTML = '';
    const preCompRef = this._layoutComponentRef[elmName];
    if (preCompRef != null && preCompRef.componentType != componentType) {
      this._compService.detachView(preCompRef);
    }
    this._layoutComponentRef[elmName] = this._compService.attachView(componentType, componentData, outerElmRef.nativeElement);
    return this._layoutComponentRef[elmName];
  }

  private _detachLayoutComponent(elmName: string): void {
    const outerElmRef: ElementRef = this._layoutElmRef[elmName];
    if (outerElmRef == null) {
      return;
    }
    const preCompRef = this._layoutComponentRef[elmName];
    if (preCompRef != null) {
      this._compService.detachView(preCompRef);
    }
  }

  open(elm: string): void {
    if (this._enabled[elm]) {
      this._opened[elm] = true;
    } else {
      this._opened[elm] = false;
    }
    this._layoutElmOpened$.next(this._opened);
  }

  close(elm: string): void {
    this._opened[elm] = false;
    this._layoutElmOpened$.next(this._opened);
  }

  toggle(elm: string): void {
    this._opened[elm] = !this._opened[elm];
    // console.log('toggle ' + elm + ': ' + JSON.stringify(this._opened));
    this._layoutElmOpened$.next(this._opened);
  }

  leftPosition(): number {
    if (!this.isOverlayNavbar() && this._enabled[LayoutElmName.NAVBAR]) {
      return 256;
    }
    return 0;
  }
}

export const LayoutElmName = {
  HEADER: 'header',
  TOOLBAR: 'toolbar',
  NAVBAR: 'navbar',
  FOOTER: 'footer',
};
