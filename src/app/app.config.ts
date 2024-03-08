import { Injectable, Type } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { cloneDeep } from 'lodash';
import { BehaviorSubject, distinctUntilChanged, filter, fromEvent, interval, Observable, of } from "rxjs";
import { ArrayIsNotEmpty, PjKeyValue, PjSideMenuItem } from "src/component/components.global";
import { environment } from "src/environments/environment";
import { UseraccountModel } from "src/model/useraccount.model";
import { ComponentService } from "src/service/component.service";
import { PolarJService } from "src/service/polarj.service";
import { RestfulService } from "src/service/restful.service";
import { StorageService } from "src/service/storage.service";
import { ScreenSizeBreakPointString } from "./app.constant";


// 只处理系统运行过程中的数据
class AppConfiguration {
    closeEvent: Observable<Event> = fromEvent(window, 'beforeunload');
    timerEvent: Observable<number> = interval(100);
    secondTimerEvent: Observable<number> = interval(1000);
    loginUser: BehaviorSubject<UseraccountModel> = new BehaviorSubject<any>(null);
}

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private _appConfig: PjKeyValue<any>;

    private _storageServiceType: Type<StorageService> = environment.storageServiceType;
    private _projectServiceType: Type<PolarJService> = environment.projectService;
    private _projectService: PolarJService;

    constructor(private _titleService: Title, private _translateService: TranslateService,
        _c: ComponentService, _rs: RestfulService, _r: Router) {
        this._translateService.use('en-us');
        this._translateService.onLangChange.subscribe(() => {
            this._titleService.setTitle(environment.browserTitle);
        });
        this._appConfig = new AppConfiguration();
        let _s: StorageService;
        if (this._storageServiceType != null) {
            _s = new this._storageServiceType();
        } else {
            _s = new StorageService();
        }
        if (this._projectServiceType != null) {
            this._projectService = new this._projectServiceType(_rs, _r, this, _s, _c);
        } else {
            this._projectService = new PolarJService(_rs, _r, this, _s);
        }
    }

    private _menuItems?: Array<PjSideMenuItem>;

    i18n(key: string): string {
        return this._translateService.instant(key);
    }

    projectService(): PolarJService {
        return this._projectService;
    }

    getMenuItems(): Array<PjSideMenuItem> {
        return this._menuItems || [];
    }

    resetFocusedMenuItem(path: string, notWithRouter?: boolean): void {
        if(path.endsWith('/')) {
          path = path.slice(0, path.length - 1);
        }
        if (notWithRouter) {
            path = path.substring(path.lastIndexOf('/') + 1);
        }
        if (ArrayIsNotEmpty(this._menuItems)) {
            this._menuItems!.forEach(item => {
                item.focused = false;
                if (ArrayIsNotEmpty(item.children)) {
                    item.children?.forEach(subItem => {
                        subItem.focused = false;
                        if (subItem.actionString === path) {
                            subItem.focused = true;
                            item.expanded = true;
                        } else {
                            subItem.focused = false;
                        }
                    });
                } else {
                    if (item.actionString === path) {
                        item.focused = true;
                    } else {
                        item.focused = false;
                    }
                }
            });
        }
    }
    resetMenuItem(items: Array<PjSideMenuItem>): void {
        this._menuItems = items;
    }

    private _screenSize = ScreenSizeBreakPointString.XS;

    setElementSize(_elm: HTMLElement, size: string): void {
        _elm.classList.remove('xs', 'md', 'sm', 'lg', 'xl', 'xxl', 'xxxl');
        switch (size) {
            case 'xs':
                _elm.classList.add('xs');
                break;
            case 'sm':
                _elm.classList.add('xs', 'sm');
                break;
            case 'md':
                _elm.classList.add('xs', 'sm', 'md');
                break;
            case 'lg':
                _elm.classList.add('xs', 'sm', 'md', 'lg');
                break;
            case 'xl':
                _elm.classList.add('xs', 'sm', 'md', 'lg', 'xl');
                break;
            case 'xxl':
                _elm.classList.add('xs', 'sm', 'md', 'lg', 'xl', 'xxl');
                break;
            case 'xxxl':
                _elm.classList.add('xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl');
                break;
        }
    }

    getScreenSize(): string {
        return this._screenSize;
    }
    setScreenSize(size: string): void {
        if (ScreenSizeBreakPointString.ALL.indexOf(size) != -1) {
            this._screenSize = size;
        }
    }
    secondTimerEvent(): Observable<number> {
        return this._fetchAppConfig('secondTimerEvent');
    }
    timerEvent(): Observable<number> {
        return this._fetchAppConfig('timerEvent');
    }

    closeEvent(): Observable<Event> {
        return this._fetchAppConfig('closeEvent');
    }

    loginUser(): Observable<UseraccountModel> {
        return this._fetchAppConfig('loginUser');
    }
    loginUserValue(): UseraccountModel {
        return this._getAppConfigValue('loginUser');
    }
    newLoginUser(u: UseraccountModel): void {
        this._resetAppConfig('loginUser', u);
    }

    private _getAppConfigValue(fieldName: string): any {
        if (this._appConfig[fieldName] !== undefined) {
            return cloneDeep(this._appConfig[fieldName].getValue());
        }
        return null;
    }

    private _fetchAppConfig(fieldName: string, canSame?: boolean): Observable<any> {
        if (!this._appConfig[fieldName]) {
            return of(null);
        }
        const config$ = this._appConfig[fieldName].pipe(
            filter(v => v !== null)
        );
        if (!canSame) {
            return config$.pipe(distinctUntilChanged());
        }
        return config$;
    }

    private _resetAppConfig(fieldName: string, fieldValue: any): void {
        if (this._appConfig[fieldName] !== undefined) {
            this._appConfig[fieldName].next(fieldValue);
        }
    }
}