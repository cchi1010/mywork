import { ComponentRef, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, filter, map, of, tap } from "rxjs";
import { AppConfigService } from "src/app/app.config";
import { APPCONSTANT } from "src/app/app.constant";
import { ArrayIsNotEmpty, HasStringValue, PjDropdownItem, PjFieldValue, isTrue } from "src/component/components.global";
import { environment } from "src/environments/environment";
import { MODULE_SERVICE_NAME } from "src/environments/service.config";
import { PagingData, ServerResponse, StatusInfo } from "src/model/base.model";
import { UseraccountModel } from "src/model/useraccount.model";
import { RestfulService } from "./restful.service";
import { PathName, RoutingService } from "./routing.service";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class PolarJService {
  private static RBAC_MODULE_NAME = 'rbac';
  constructor(private _restfulService: RestfulService, private _router: Router,
    private _appCfgService: AppConfigService, protected _storageService: StorageService
  ) { }

  httpProcessDone(): Observable<boolean> {
    return this._restfulService.httpProcessing();
  }

  externalHttpProcessingBegin(): void {
    this._restfulService.externalHttpProcessingBegin();
  }

  externalHttpProcessingEnd(): void {
    this._restfulService.externalHttpProcessingEnd();
  }

  saveUserAccount(ua: UseraccountModel): Observable<UseraccountModel> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME,
      modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: ua.id ? '' + ua.id : '',
      para: ua,
      singleData: true
    });
  }

  changeUserAccountPassword(loginName: string, oldPswd: string, newPswd: string): Observable<any> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME,
      modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: PathName.CHANGE_PASSWORD,
      para: {
        loginName: loginName,
        oldPassword: oldPswd,
        newPassword: newPswd
      }, singleData: true
    });
  }
  handleHeaderRef(headerRef: ComponentRef<any>, r: RoutingService): void {
  }
  generateHeaderMenus(): Observable<Array<PjDropdownItem>> {
    return of([]);
  }

  currentLogin(): Observable<UseraccountModel | undefined> {
    if (!this.isLogged()) {
      return of(undefined);
    }
    let u: UseraccountModel = this._storageService.getSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER);
    if (u != null) {
      return of(u);
    }
    return this.getCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.AUTH,
      requestMappingString: PathName.LOGIN, enableErrorMsg: true, singleData: true
    }).pipe(tap(v => {
      if (v == null || isTrue(v.anonUser)) {
        this._removeLocalCredential();
        this._removeLocalMeta();
      } else {
        this._saveCredentialLocally(v);
      }
    }));
  }

  login(useracc: UseraccountModel, rememberMe?: boolean, urlAfterLogin?: string): Observable<UseraccountModel | null> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.AUTH,
      requestMappingString: PathName.LOGIN, para: useracc,
      captchaResp: useracc.captchaResp, enableErrorMsg: true, singleData: true
    }).pipe(map(u => this._afterLogin(u, rememberMe, urlAfterLogin)));
  }

  emailLogin(oneTimeToken: string): Observable<UseraccountModel | null> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.AUTH,
      requestMappingString: PathName.EMAIL_LOGIN, para: oneTimeToken,
      enableErrorMsg: true, singleData: true
    }).pipe(map(u => this._afterLogin(u)));
  }

  register(useracc: UseraccountModel, captchaResp: string, returnUrl: string): Observable<boolean> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME,
      modelName: PolarJServerModelContextPath.USERACCOUNT,
      captchaResp: captchaResp,
      requestMappingString: PathName.REGISTER,
      urlPara: 'returnUrl=' + returnUrl,
      para: useracc, enableErrorMsg: true, singleData: true
    }).pipe(map(u => { return u != null; }));
  }

  verify(loginName: string, verificationCode: string, returnUrl: string): Observable<boolean> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: PathName.CONFIRM,
      urlPara: 'loginName=' + loginName + '&verificationCode=' + verificationCode + '&returnUrl=' + returnUrl,
      enableErrorMsg: true, singleData: true
    });
  }

  requestVerificationCode(loginName: string, returnUrl: string): Observable<UseraccountModel> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: PathName.RESEND_VERIFICATION,
      urlPara: 'loginName=' + loginName + '&returnUrl=' + returnUrl,
      enableErrorMsg: true, singleData: true
    });
  }

  isLogged(): boolean {
    let s = this._storageService.getJWT();
    let b = HasStringValue(s);
    if (!b) {
      this._removeLocalMeta();
    }
    return b;
  }

  // 处理登录成功之后的操作。
  // 各个项目可以定义专用的处理。
  private _afterLogin(u: UseraccountModel, rememberMe?: boolean, urlAfterLogin?: string): UseraccountModel | null {
    if (u == null || u.jwtToken == null || u.jwtToken.length == 0 || u.loginName == null || u.loginName.length == 0) {
      return null;
    }
    if (rememberMe) {
      this._storageService.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER_NAME, u.loginName);
    }
    if (urlAfterLogin && urlAfterLogin.length > 0) {
      this._storageService.setLocalItem(u.loginName + '-' + APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LAST_USED_URL, urlAfterLogin);
    }
    this._saveCredentialLocally(u);
    this._appCfgService.newLoginUser(u);
    return u;
  }

  logout(): Observable<any> {
    // 在登出之前，先保存登录用户最后的访问链接
    this._saveCurrentUrl();
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.AUTH,
      requestMappingString: PathName.LOGOUT, enableErrorMsg: true, singleData: true
    }).pipe(tap(() => {
      this._removeLocalCredential();
      this._removeLocalMeta();
      if (!environment.enableAnonymous) {
        this._router.navigateByUrl(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_PAGE_URL);
      }
    }));
  }

  private _saveCredentialLocally(u: UseraccountModel): void {
    this._storageService.setSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER, u);
    if (HasStringValue(u.jwtToken)) {
      this._storageService.setJWT(u.jwtToken);
    }
  }
  private _removeLocalCredential(): void {
    this._storageService.removeSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER);
    this._storageService.removeSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.MAIN_MENU);
    this._storageService.removeJWT()
  }

  private _removeLocalMeta(): void {
    for (let moduleName in MODULE_SERVICE_NAME) {
      this._storageService.removeLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.METADATA + moduleName.toLowerCase());
    }
  }

  requestOneTimeLoginLink(loginEmail: string, captchaResp: string, returnUrl: string): Observable<boolean> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.AUTH,
      requestMappingString: PathName.EMAIL_LOGIN_REQUEST,
      urlPara: 'returnUrl=' + returnUrl,
      captchaResp: captchaResp, para: loginEmail, singleData: true
    });
  }

  requestResetPasswordLinkByEmail(loginEmail: string, captchaResp: string, returnUrl: string): Observable<any> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: PathName.RESET_PASSWORD_REQUEST,
      urlPara: 'returnUrl=' + returnUrl,
      captchaResp: captchaResp,
      para: { loginName: loginEmail },
      enableErrorMsg: true,
      singleData: true
    });
  }

  resetPassword(loginName: string, verificationCode: string, newPassword: string): Observable<boolean> {
    return this.postCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME, modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: PathName.RESET_PASSWORD_LINK,
      para: { loginName: loginName, verificationCode: verificationCode, newPassword: newPassword },
      enableErrorMsg: true,
      singleData: true
    });
  }

  getSecurityQuestions(): Array<PjFieldValue> {
    let fv: PjFieldValue;
    const qas = new Array<PjFieldValue>();
    for (let i = 1; i < 11; i++) {
      fv = { label: i + '. In which city did your mother born?', textValue: 'asdasd123' };
      qas.push(fv);
    }
    return qas;
  }

  getAccountProfilePicture(buyerId: number, fileName: string): Observable<string> {
    return this.getCall({
      moduleServiceName: PolarJService.RBAC_MODULE_NAME,
      modelName: PolarJServerModelContextPath.USERACCOUNT,
      requestMappingString: 'getImgUrl',
      urlPara: 'fileName=' + fileName + '&id=' + buyerId,
      singleData: true,
    });
  }

  postCall(postCallPara: PostCallParameter): Observable<any> {
    const ob$ = this._restfulService.postCall(postCallPara, postCallPara.para);
    return this._handleServerResponse(ob$, postCallPara.enableErrorMsg, postCallPara.singleData, postCallPara.pageData);
  }

  deleteCall(delCallPara: DeleteCallParameter): Observable<any> {
    const ob$ = this._restfulService.deleteCall(delCallPara);
    return this._handleServerResponse(ob$, delCallPara.enableErrorMsg, delCallPara.singleData, delCallPara.pageData);
  }
  getCall(getCallPara: GetCallParameter): Observable<any> {
    const ob$ = this._restfulService.getCall(getCallPara);
    return this._handleServerResponse(ob$, getCallPara.enableErrorMsg, getCallPara.singleData, getCallPara.pageData);
  }

  downloadPostCall(postCallPara: PostCallParameter, para?: any, fileName?: string, fileType?: string): void {
    this._restfulService.downloadPostCall(postCallPara, para, fileName || '', fileType || 'pdf', true);
  }

  downloadCall(getCallPara: GetCallParameter, fileName?: string, fileType?: string): void {
    this._restfulService.downloadCall(getCallPara, (fileName || ''), (fileType || 'pdf'), true);
  }

  uploadCall(postCallPara: PostCallParameter, files: File[]): Observable<number[]> {
    const ob$ = this._restfulService.uploadCall(postCallPara, files).pipe(filter(res => res.statusList != null));
    return this._handleServerResponse(ob$, postCallPara.enableErrorMsg);
  }

  private _handleServerResponse(ob$: Observable<any>, enableErrorMsg?: boolean, oneData?: boolean, pageData?: boolean): Observable<any> {
    if (oneData) {
      return ob$.pipe(map(response => this._handleOneData(response, enableErrorMsg)));
    }
    if (pageData) {
      return ob$.pipe(map(response => this._handlePagingData(response, enableErrorMsg)));
    }
    return ob$.pipe(map(response => this._handleDataList(response, enableErrorMsg)));
  }

  private _handleOneData(serverResponse: ServerResponse, enableErrorMsg?: boolean): any {
    const hasError = this._hasError(serverResponse, enableErrorMsg);
    if (hasError) {
      return serverResponse.statusList||null;
    }
    if (!serverResponse.dataList) {
      return null;
    }
    if (serverResponse.dataList.length > 1) {
      console.error('singleData is true but returned more than one data.');
      return null;
    }
    return serverResponse.dataList[0];
  }

  private _handlePagingData(serverResponse: ServerResponse, enableErrorMsg?: boolean): PagingData<any> | null | Array<StatusInfo> {
    const hasError = this._hasError(serverResponse, enableErrorMsg);
    if (hasError) {
      console.error(serverResponse);
      return serverResponse.statusList || null;
    }
    const pagingData = new PagingData();
    pagingData.currentPageIndex = serverResponse.currentPageIndex;
    pagingData.dataList = serverResponse.dataList;
    pagingData.pageSize = serverResponse.pageSize;
    pagingData.totalPages = serverResponse.totalPages;
    pagingData.totalRecords = serverResponse.totalRecords;
    return pagingData;
  }

  private _handleDataList(serverResponse: ServerResponse, enableErrorMsg?: boolean): Array<any> | null | Array<StatusInfo> {
    const hasError = this._hasError(serverResponse, enableErrorMsg);
    if (hasError) {
      console.error(serverResponse);
      return serverResponse.statusList || null;
    }
    if (!serverResponse.dataList) {
      return null;
    }
    return serverResponse.dataList;
  }

  private _hasError(serverResponse: ServerResponse, enableErrorMsg?: boolean): boolean {
    if (!serverResponse) {
      return true;
    }
    let hasError = false;
    if (serverResponse.statusList && serverResponse.statusList.length > 0 && enableErrorMsg) {
      let msg = serverResponse.statusList[0].desc;
      serverResponse.statusList.forEach(status => {
        if (status.error) {
          msg = status.desc;
          hasError = true;
        }
      });
      if (hasError) {
        // this._messageService.error(msg, enableErrorMsg);
        // console.log('ERROR: ' + msg);
        return true;
      }
      // console.log('ALERT: ' + msg);
      // this._messageService.alertWarning(msg, enableErrorMsg);
    }
    return false;
  }

  private _saveCurrentUrl(): void {
    const u = this._appCfgService.loginUserValue();
    if (u != null && u.loginName != null) {
      this._storageService.setLocalItem(u.loginName + '-' + APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LAST_USED_URL, this._router.url);
    }
  }
}

// moduleServiceName: string;
// modelName: string;
// requestMappingString?: string;
// urlPara?: string;
// operateAutomatically?: boolean;
class HttpCallParameter {
  moduleServiceName: string = '';
  modelName: string = '';
  requestMappingString?: string = '';
  urlPara?: string;
  captchaResp?: string;

  // 是否前端自动访问后端的操作，缺省值为不是，相当于假定访问服务器数据的操作都是用户主动的操作，
  // 前端保存访问的时间，作为用户在线的标志，该标志影响替匿名用户保存的数据。
  // 登录的用户其使用数据在登出时自动删除，如果没有主动登出，则在下次登录时主动删除？
  // 每次登录时从服务器获取相关的需要本地暂存的数据？
  // 周期性（指定分钟数）更新登录用户被修改过的本地保存数据？
  operateAutomatically?: boolean;

  // contextUrl: string = '';            // https://[host]:[port]/[moduleServiceName]/[contextUrl] TODO: 应该从服务器获取业务模型所在的module service name？
  enableErrorMsg?: boolean;
  pageData?: boolean;
  singleData?: boolean;
  listData?: boolean;
  static isValid(para: HttpCallParameter): boolean {
    if (!HasStringValue(para.moduleServiceName) || !HasStringValue(para.modelName)) {
      return false;
    }
    return true;
  }
}
export class PostCallParameter extends HttpCallParameter {
  para?: any;
}

export class GetCallParameter extends HttpCallParameter {
}

export class DeleteCallParameter extends HttpCallParameter {
}

const PolarJServerModelContextPath = {
  AUTH: 'auth',
  USERACCOUNT: 'useraccounts'
}
