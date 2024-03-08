import { Injectable } from '@angular/core';
import { NavigationStart, Router, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { HasStringValue } from 'src/component/components.global';


@Injectable({ providedIn: 'root' })
export class RoutingService {

  constructor(protected _router: Router) {
  }

  navigationUrl(): Observable<any> {
    return this._router.events.pipe(
      map(event => { return (event instanceof NavigationStart) ? event : null; }),
      filter(v => v != null), map(event => { return event?.url; }), take(1)
    );
  }

  gotoHomePage(): void {
    this.gotoUrl(PathName.HOME);
  }

  gotoLoginPage(redirectUrl?: string): void {
    if (HasStringValue(redirectUrl)) {
      this._router.navigate([PathName.LOGIN, { redirectUrl: this.base64Encode(redirectUrl!) }]);
    } else {
      this.gotoUrl(PathName.LOGIN);
    }
  }

  gotoLoginPageThenRedirection(url: string): Promise<boolean | UrlTree> {
    return this._router.navigate([PathName.LOGIN, { redirectUrl: this.base64Encode(url) }]);
  }

  gotoRegisterPage(redirectUrl?: string): void {
    if (HasStringValue(redirectUrl)) {
      this._router.navigate([PathName.REGISTER, { redirectUrl: this.base64Encode(redirectUrl!) }]);
    } else {
      this.gotoUrl(PathName.REGISTER);
    }
  }

  gotoResetPasswordPage(loginName: string): void {
    this.gotoUrl(PathName.RESET_PASSWORD.replace('\:loginName', loginName));
  }

  gotoTestLink(componentName: string): void {
    if (componentName.length > 0) {
      this.gotoUrl(PathName.TEST_COMPONENT.replace('\:componentName', componentName));
    }
  }

  gotoComingSoonPage(): void {
    this.gotoUrl(PathName.COMING_SOON);
  }

  gotoError404(): void {
    this.gotoUrl(PathName.ERROR404);
  }
  gotoPJComponentLink(componentName: string): void {
    if (componentName.length > 0) {
      this.gotoUrl(PathName.PJ_COMPONENT_NAME.replace('\:componentName', componentName));
    }
  }
  gotoUrl(url: string): void {
    this._router.navigateByUrl(url);
  }

  base64Encode(s: string): string {
    return Base64.encode(s);
  }

  base64Decode(s: string): string {
    return Base64.decode(s);
  }

  protected currentLink(): string {
    return location.href.substring(document.getElementsByTagName('base')[0].href.length);
  }
}

class Base64 {
  // private property
  // _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  private static _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.';
  // public method for encoding
  static encode(input: string): string {
    if (!input) {
      return '';
    }
    let output = '';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = Base64._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      // tslint:disable: no-bitwise
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      // tslint:enable: no-bitwise
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
    }
    return output;
  }
  // public method for decoding
  static decode(input: string): string {
    if (!input) {
      return '';
    }
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    // input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    input = input.replace(/[^A-Za-z0-9\-\_\.]/g, '');
    while (i < input.length) {
      enc1 = Base64._keyStr.indexOf(input.charAt(i++));
      enc2 = Base64._keyStr.indexOf(input.charAt(i++));
      enc3 = Base64._keyStr.indexOf(input.charAt(i++));
      enc4 = Base64._keyStr.indexOf(input.charAt(i++));
      // tslint:disable: no-bitwise
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      // tslint:enable: no-bitwise
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = Base64._utf8_decode(output);
    return output;
  }
  // private method for UTF-8 encoding
  private static _utf8_encode(str: string): string {
    str = str.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < str.length; n++) {
      const c = str.charCodeAt(n);
      // tslint:disable: no-bitwise
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      // tslint:enable: no-bitwise
    }
    return utftext;
  }
  // private method for UTF-8 decoding
  private static _utf8_decode(utftext: string): string {
    let str = '';
    let i = 0;
    let c = 0, c2 = 0, c3 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      // tslint:disable: no-bitwise
      if (c < 128) {
        str += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
      // tslint:enable: no-bitwise
    }
    return str;
  }
}

export const PathName = {
  HOME: '',
  LOGIN: 'login',
  LOGOUT: 'logout',
  EMAIL_LOGIN: 'email-login',
  REGISTER: 'register',                                  // 需要returnUrl参数，是前端的站点链接
  CONFIRM: 'confirm',                                    // 需要returnUrl参数，是前端的站点链接
  EMAIL_LOGIN_REQUEST: 'email-login-request',            // 需要returnUrl参数，是前端的站点链接
  RESET_PASSWORD_LINK: 'reset-password',
  RESET_PASSWORD_REQUEST: 'reset-password-request',      // 需要returnUrl参数，是前端的站点链接
  RESEND_VERIFICATION: 'resend-verification',            // 需要returnUrl参数，是前端的站点链接
  RESET_PASSWORD: 'reset-password/:loginName',
  CHANGE_PASSWORD: 'change-password',
  COMING_SOON: 'coming-soon',
  ERROR404: 'error-404',
  MAINTENANCE: 'maintenance',
  TEST: 'test',
  TEST_COMPONENT: 'test/:componentName',
  PJ_COMPONENT: 'pj-component',
  PJ_COMPONENT_NAME: 'pj-component/:componentName',
  PJ_DOCUMENT: 'pjdoc',
  PJ_DOCUMENT_COMPONENT: 'pjdoc/:componentName',
  ORDERS: 'orders'
}