import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FileUploader, Headers } from "ng2-file-upload";
import { CookieService } from "ngx-cookie-service";
import { FileSaverService } from "ngx-filesaver";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";
import { APPCONSTANT } from "src/app/app.constant";
import { HasStringValue, PjKeyValue, PjProperty } from "src/component/components.global";
import { moduleService } from "src/environments/service.config";
import { ClientRequest, ServerResponse } from "src/model/base.model";
import { UseraccountModel } from "src/model/useraccount.model";
import { StorageService } from "./storage.service";

interface ServiceUrlPart {
  protocal: string;
  host: string;
  port: string;
}

@Injectable({ providedIn: 'root' })
export class RestfulService {

  private _httpAccessing: BehaviorSubject<1 | -1 | 0> = new BehaviorSubject<1 | -1 | 0>(0);

  private _httpAccessingAmount: number = 0;

  private _httpAccessDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private fileTypeAcceptStringMap: PjProperty = {
    'pdf': 'application/pdf',
    'xml': 'application/xml',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xls': 'application/vnd.ms-excel',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'doc': 'application/msword',
    'json': 'application/json',
    'txt': 'text/plain',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
  };

  private canOpenFileType: PjProperty = {
    'pdf': 'application/pdf',
    'xml': 'application/xml',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'txt': 'text/plain',
    'json': 'application/json',
  };

  constructor(
    private _httpClient: HttpClient, private _translateService: TranslateService,
    private _cookieService: CookieService, private _fileSaverService: FileSaverService,
    private _storageService: StorageService) {
    this._httpAccessing.subscribe(accessStatus => {
      this._httpAccessingAmount = this._httpAccessingAmount + accessStatus;
      // console.log('There is '+ this._httpAccessingAmount + ' http connections in progress.');
      if (this._httpAccessingAmount > 0) {
        this._httpAccessDone.next(false);
      } else {
        this._httpAccessingAmount = 0;
        this._httpAccessDone.next(true);
      }
    });
  }

  private _handleHttpData(httpData$: Observable<any>): Observable<ServerResponse> {
    const that = this;
    return httpData$.pipe(
      tap(v => { this._httpAccessing.next(-1); this._handleJWTExpired(v.headers.get('JWT_expired')) }),
      map(v => { return v.body }),
      catchError(error => that._handleError(error))
    ) as Observable<ServerResponse>;
  }

  private _handleJWTExpired(expired: any): void {
    if (expired == null) {
      return;
    }
    let u: UseraccountModel = this._storageService.getSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER);
    if (u != null) {
      u.isExpired = true;
      this._storageService.setSessionItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LOGIN_USER, u);
    }
  }

  externalHttpProcessingBegin(): void {
    this._httpAccessing.next(1);
  }

  externalHttpProcessingEnd(): void {
    this._httpAccessing.next(-1);
  }
  
  httpProcessing(): Observable<boolean> {
    return this._httpAccessDone;
  }
  // 对应http的get method
  getCall(urlPart: HttpUrlPart): Observable<ServerResponse> {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    const httpData$ = that._httpClient.get(that._getBackendUrl(urlPart), that._generateHttpCallOptions());
    return that._handleHttpData(httpData$);
  }

  // 对应http的post method
  postCall(urlPart: HttpUrlPart, para: any): Observable<ServerResponse> {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    let jsonParaString!: string;
    const clientReq: ClientRequest = new ClientRequest();
    clientReq.nonceToken = that._generateNonceToken();
    clientReq.data = para;
    if (urlPart.captchaResp != null) {
      clientReq.captchaResp = urlPart.captchaResp;
    }
    jsonParaString = JSON.stringify(clientReq);
    const httpData$ = that._httpClient.post(that._getBackendUrl(urlPart), jsonParaString, that._generateHttpCallOptions());
    return that._handleHttpData(httpData$);
  }

  // 对应http的put method
  putCall(urlPart: HttpUrlPart, para: any): Observable<ServerResponse> {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    let jsonParaString!: string;
    const clientReq: ClientRequest = new ClientRequest();
    clientReq.nonceToken = that._generateNonceToken();
    clientReq.data = para;
    if (urlPart.captchaResp != null) {
      clientReq.captchaResp = urlPart.captchaResp;
    }
    jsonParaString = JSON.stringify(clientReq);
    const httpData$ = that._httpClient.post(that._getBackendUrl(urlPart), jsonParaString, that._generateHttpCallOptions());
    return that._handleHttpData(httpData$);
  }

  // 对应http的delete method
  // 目前只用于删除指定id的业务模型
  deleteCall(urlPart: HttpUrlPart): Observable<ServerResponse> {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    const httpData$ = that._httpClient.delete(that._getBackendUrl(urlPart), that._generateHttpCallOptions());
    return that._handleHttpData(httpData$);
  }

  downloadPostCall(urlPart: HttpUrlPart, para: any, fileName: string, fileType: string, openFile: boolean): void {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    if (!fileType) {
      fileType = fileName.substring(fileName.indexOf('.') + 1, fileName.length);
      fileType = (fileType ? fileType : 'pdf');
    }
    const downloadHeaders: HttpHeaders = new HttpHeaders();

    downloadHeaders.append('Accept', this.fileTypeAcceptStringMap[fileType]);

    const options = that._generateHttpCallOptions(downloadHeaders);

    let jsonParaString!: string;
    const clientReq: ClientRequest = new ClientRequest();
    clientReq.nonceToken = that._generateNonceToken();
    clientReq.data = para;
    if (urlPart.captchaResp != null) {
      clientReq.captchaResp = urlPart.captchaResp;
    }
    jsonParaString = JSON.stringify(clientReq);
    that._httpClient.post(that._getBackendUrl(urlPart), jsonParaString, {
      responseType: 'blob', headers: options.headers, withCredentials: options.withCredentials
    }).subscribe(value => {
      this._httpAccessing.next(-1);
      const blob = new File([value], fileName, { type: that.fileTypeAcceptStringMap[fileType] });
      if (openFile && that.canOpenFileType[fileType] != null) {
        // 这两行代码是从浏览器直接打开从服务器得到的文件，但是一直没有找到显示文件名的方案。
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      } else {
        this._fileSaverService.save(blob, fileName);
      }
    });
  }
  downloadCall(urlPart: HttpUrlPart, fileName: string, fileType: string, openFile: boolean): void {
    this._httpAccessing.next(1);
    const that = this;
    this._saveLastAccessTime(urlPart);
    if (!fileType) {
      fileType = fileName.substring(fileName.indexOf('.') + 1, fileName.length);
      fileType = (fileType ? fileType : 'pdf');
    }
    const downloadHeaders: HttpHeaders = new HttpHeaders();

    downloadHeaders.append('Accept', this.fileTypeAcceptStringMap[fileType]);

    const options = that._generateHttpCallOptions(downloadHeaders);


    this._httpClient.get(that._getBackendUrl(urlPart), {
      responseType: 'blob', headers: options.headers, withCredentials: options.withCredentials
    }).subscribe(value => {
      this._httpAccessing.next(-1);
      const blob = new File([value], fileName, { type: that.fileTypeAcceptStringMap[fileType] });
      if (openFile && that.canOpenFileType[fileType] != null) {
        // 这两行代码是从浏览器直接打开从服务器得到的文件，但是一直没有找到显示文件名的方案。
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      } else {
        this._fileSaverService.save(blob, fileName);
      }
    });
  }

  uploadCall(postCallPara: HttpUrlPart, files: File[]): Observable<ServerResponse> {
    this._httpAccessing.next(1);
    const that = this;
    let successItem$ = new BehaviorSubject<ServerResponse>(new ServerResponse());
    let handlerUrl = this._getBackendUrl(postCallPara);
    const jwtToken = this._storageService.getJWT();
    let uploadHeaders: Array<Headers> = new Array<Headers>();
    if (jwtToken != null && jwtToken.length > 0) {
      uploadHeaders.push({ name: 'JWT', value: jwtToken });
    }
    let _fileUploader = new FileUploader({ url: handlerUrl, removeAfterUpload: true, headers: uploadHeaders });
    // _fileUploader.onProgressItem = function (fileItem: FileItem, progress: number): void {
    //   console.log('Uploading: ' + fileItem.file.name + ', ' + progress + '%');
    // };
    _fileUploader.onProgressAll = function (progress: number): void {
      that._httpAccessing.next(-1);
    };
    _fileUploader.onSuccessItem = (item, response, status, headers) => {
      successItem$.next(JSON.parse(response));
    };
    _fileUploader.onCompleteAll = function (): void {
    };
    _fileUploader.addToQueue(files);
    if (HasStringValue(handlerUrl)) {
      _fileUploader.uploadAll();
    }
    return successItem$;
  }
  // currentLink(): string {
  //     const url = location.href.substring(document.getElementsByTagName('base')[0].href.length);
  //     return url;
  // }

  private _saveLastAccessTime(urlPart: HttpUrlPart): void {
    if (urlPart.operateAutomatically) {
      return;
    }
    this._storageService.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.LAST_ACCESS_TIME, (new Date()).getTime());
  }

  private _getBackendUrl(urlPart: HttpUrlPart): string {
    let moduleServiceConfig: PjKeyValue<ServiceUrlPart> = moduleService;
    let s = moduleServiceConfig[urlPart.moduleServiceName].protocal;
    if (HasStringValue(moduleServiceConfig[urlPart.moduleServiceName].host)) {
      s = s + moduleServiceConfig[urlPart.moduleServiceName].host;
    } else if (HasStringValue(moduleServiceConfig[urlPart.moduleServiceName].host)) {
      s = s + moduleServiceConfig[urlPart.moduleServiceName].host;
    } else {
      s = s + location.hostname;
    }
    if (HasStringValue(moduleServiceConfig[urlPart.moduleServiceName].port)) {
      s = s + ':' + moduleServiceConfig[urlPart.moduleServiceName].port;
    }
    s = s + '/' + urlPart.moduleServiceName + '/' + urlPart.modelName;
    if (HasStringValue(urlPart.requestMappingString)) {
      s = s + '/' + urlPart.requestMappingString + (HasStringValue(urlPart.urlPara) ? ('?' + urlPart.urlPara) : '');
    } else {
      s = s + (HasStringValue(urlPart.urlPara) ? ('?' + urlPart.urlPara) : '');
    }
    return s;
  }

  private _generateHttpCallOptions(optionHeaders?: HttpHeaders): any {
    const jwtToken = this._storageService.getJWT();
    let headers: HttpHeaders;
    if (jwtToken == null || jwtToken.length <= 0) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'JWT': jwtToken, 'JWT_expired': '' });
    }
    if (optionHeaders != null) {
      optionHeaders.keys().forEach(key => {
        if (optionHeaders.get(key) != null) {
          let s: string = optionHeaders.get(key) as string;
          headers.append(key, s);
        }
      });
    }
    return {
      headers: headers,
      observe: "response",
      withCredentials: true
    };
  }

  private _generateNonceToken(): string {
    return '123123123';
  }

  private _handleError(error: HttpResponse<any>): Observable<ServerResponse> {
    let errorMsgKey: string;
    this._httpAccessing.next(-1);
    if (parseInt('' + (error.status / 100), 10) === 3) {
      errorMsgKey = 'http.3XX';
    } else if (parseInt('' + (error.status / 100), 10) === 5) {
      errorMsgKey = 'http.5XX';
    } else if (parseInt('' + (error.status / 100), 10) === 4) {
      if (error.status === 401 || error.status === 403 || error.status === 404) {
        errorMsgKey = 'http.' + error.status;
      } else {
        errorMsgKey = 'http.4XX';
      }
    } else if (error.status === 0) {
      // 不知道为什么会变成这个错误代码的：
      // 貌似Shiro的错误信息都变成了这个错误代码，但是浏览器调试时，看到的是403或者其他。
      errorMsgKey = 'http.401';
    } else {
      errorMsgKey = 'http.XXX';
    }
    let errorMsg: string;
    const that = this;
    let lang = that._cookieService.get(APPCONSTANT.COOKIENAME.LANGUAGE);
    if (!lang || lang.length === 0) {
      lang = that._translateService.defaultLang;
    }
    return that._translateService.use(lang).pipe(
      (): Observable<ServerResponse> => {
        errorMsg = that._translateService.instant(errorMsgKey);
        const serverResp = new ServerResponse();
        serverResp.addErrorMessage(errorMsgKey, errorMsg);
        return of(serverResp);
      }
    );
  }
}

interface HttpUrlPart {
  moduleServiceName: string;
  modelName: string;
  requestMappingString?: string;
  urlPara?: string;
  operateAutomatically?: boolean;
  captchaResp?: string;
}

