import { Component, ComponentRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AmMallData } from 'src/ammall/am-model/ammall.data';
import { AmFrontBusinessProfile } from 'src/ammall/am-model/machant.model';
import { AmFrontMerchantService } from 'src/ammall/am-service/am-merchant.service';
import { AmSellerService } from 'src/ammall/am-service/am-seller.service';
import { SELLER_PATH } from 'src/ammall/am-service/seller.routing.service';
import { AppLayoutService } from 'src/app/app-layout.service';
import { AppConfigService } from 'src/app/app.config';
import { APPCONSTANT } from 'src/app/app.constant';
import { ArrayIsNotEmpty, HasStringValue, PjBreadcrumbItem, comparePjDropdownItem, isFalse } from 'src/component/components.global';
import { PjLoadingService } from 'src/component/pj-loading/pj-loading.service';
import { PjModalWindowService } from 'src/component/pj-modal-window/pj-modal-window.service';
import { environment } from 'src/environments/environment';
import { UseraccountModel } from 'src/model/useraccount.model';
import { PolarJService } from 'src/service/polarj.service';
import { RoutingService } from 'src/service/routing.service';


@Component({ template: `` })
export abstract class PjPageComponent implements OnInit, OnDestroy {

  protected toolbarBreadcrumbsData = new BehaviorSubject<Array<PjBreadcrumbItem>>([]);
  protected _backUrl: string = '';
  private static _currentActivedPath: string = '';
  protected _curLoginUser?: UseraccountModel;

  protected _unsubscribeAll: Subject<any> = new Subject<any>();

  protected _projectService: PolarJService;

  protected _loadingService = inject(PjLoadingService);

  constructor(protected _layoutService: AppLayoutService, protected _routeInfo: ActivatedRoute,
    protected _routingService: RoutingService, protected _appCfgService: AppConfigService,
    protected _modalWinService: PjModalWindowService
  ) {
    this._projectService = this._appCfgService.projectService();
  }

  ngOnInit(): void {
    this._routeInfo.paramMap.subscribe(
      para => this._backUrl = this._routingService.base64Decode(para.get(APPCONSTANT.URL_PARAMETER.BACK_URL) || '')
    );
    this._getCurrentLoginUser();
    this._handleBreadcrumbs();
    if (this.needToWaitForHttpDone()) {
      this._projectService.httpProcessDone().pipe(
        takeUntil(this._unsubscribeAll)
      ).subscribe(done => {
        if (done) {
          this._loadingService.hideLoading();
        } else {
          this._loadingService.showLoading(AmMallData.optionForLoading);
        }
      });
    }
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this._loadingService.hideLoading();
  }

  protected needToWaitForHttpDone(): boolean {
    return false;
  }

  protected isFirstRoutingPage(): boolean {
    return true;
  }

  protected projectService(): PolarJService {
    return this._projectService;
  }
  onBackToHomeBtnClick(): void {
    // 即使放在此处也有些不对，再找机会重构
    let _merchantService: AmFrontMerchantService;
    if (this._projectService instanceof AmSellerService) {
      _merchantService = new AmFrontMerchantService(this.projectService());
      _merchantService.fetchMyBusinessInfo().subscribe(
        businessProfile => {
          if (businessProfile == null) {
            this._routingService.gotoUrl(SELLER_PATH.LANDING)   // 不写这里的话，会报错： _businessProfile undefined
          } else if (businessProfile.length == 0) {
            this._routingService.gotoUrl(SELLER_PATH.DEMO_DASHBOARD)
          } else {
            let profile: AmFrontBusinessProfile = businessProfile[0];
            if (profile.status != 'ACTIVE') {
              this._routingService.gotoUrl(SELLER_PATH.DEMO_DASHBOARD)
            } else {
              this._routingService.gotoHomePage();
            }
          }
        }
      );
    } else {
      this._routingService.gotoHomePage();
    }
  }

  private _getCurrentLoginUser(): void {
    if (this.isFirstRoutingPage()) {
      this._layoutService.disable([]);
      this._layoutService.detachHeaderComponent();
      this._layoutService.detachFooterComponent();
      this._layoutService.detachToolbarComponent();
    }

    this._projectService.currentLogin().subscribe(loginUser => {
      if (loginUser != null && isFalse(loginUser.anonUser)) {
        this._curLoginUser = loginUser;
        this.pageInitForLoginUser();
      } else {
        this._curLoginUser = undefined;
        this.pageInitForAnonymous();
      }
    });
  }

  protected pageInitForLoginUser(): void {
    if (this.isFirstRoutingPage()) {
      if (this.hasHeader()) {
        this.setHeader();
      }
      if (this.hasFooter()) {
        this.setFooter();
      }
      if (this.hasToolbar()) {
        this.setToolbar();
      }
    }
  }
  protected pageInitForAnonymous(): void {
    if (this._curLoginUser == null && !environment.enableAnonymous) {
      this._routingService.gotoLoginPage();
    }
  }

  protected hasHeader(): boolean {
    return true;
  }

  protected setHeader(): void {
    if (environment.headerComponent == null) {
      return;
    }
    this._projectService.generateHeaderMenus().subscribe(menuItems => {
      let _usedMenuItems = menuItems.filter(item => ArrayIsNotEmpty(item.subMenus) && (!item.value?.includes('menu.anon')));
      _usedMenuItems.forEach(item => item.subMenus?.sort(comparePjDropdownItem));
      let headerRef = this._layoutService.attachHeaderComponent(
        environment.headerComponent!, { menuItems: _usedMenuItems }
      ) as ComponentRef<any>;
      this._projectService.handleHeaderRef(headerRef, this._routingService);
    });
  }

  protected hasFooter(): boolean {
    return false;
  }
  protected setFooter(): void {
  }

  protected hasBreadcrumb(): boolean {
    return true;
  }

  protected hasToolbar(): boolean {
    return false;
  }

  protected setToolbar(): void {
  }

  private _handleBreadcrumbs(): void {
    this._routeInfo.url.subscribe(urls => {
      let _currentActivedPath = '';
      urls.forEach(url => {
        _currentActivedPath += (url.path + '/');
      });
      this._appCfgService.resetFocusedMenuItem(_currentActivedPath);
      this.toolbarBreadcrumbsData.subscribe(crumbs => this._layoutService.setCurrentBreadcrumbs(crumbs));
      this._routeInfo.data.forEach(data => {
        if (HasStringValue(data['breadcrumb'])) {
          let breadcrumbs = new Array<PjBreadcrumbItem>();
          if (environment.pathLabel != null) {
            data['breadcrumb'].forEach((bcItem: string) => breadcrumbs.push({ label: environment.pathLabel![bcItem], path: bcItem }));
          }
          if (HasStringValue(PjPageComponent._currentActivedPath)) {
            let lastItemLabel = '';
            if (environment.pathLabel != null) {
              lastItemLabel = environment.pathLabel[PjPageComponent._currentActivedPath.slice(0, PjPageComponent._currentActivedPath.length - 1)];
            }
            if (HasStringValue(lastItemLabel)) {
              breadcrumbs.push({ label: lastItemLabel, path: '' });
            }
          }
          this._layoutService.setCurrentBreadcrumbs(breadcrumbs);
          this.toolbarBreadcrumbsData.next(breadcrumbs);
        }
      });
    });
  }
}