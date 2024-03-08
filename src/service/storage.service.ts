// 处理基本的本地存储服务
// 非基础项目需要继承这个类
import { Injectable, EventEmitter } from "@angular/core";
import { APPCONSTANT } from "src/app/app.constant";


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    storageChanged = new EventEmitter<string>();

    getLocalKeys(): string[] {
        let keys = new Array<string>();
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key != null && key.length > 0) {
                keys.push(key);
            }
        }
        return keys;
    }

    hasLocalItem(key: string): boolean {
        let v = localStorage.getItem(key);
        return (v != null && v.length > 0);
    }

    setLocalItem(key: string, value: any): void {
        let s = (typeof value);
        if(s == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
        this.storageChanged.emit(key);
    }

    getJWT(): any {
      return this.getLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.JWT_TOKEN);
    }

    setJWT(jwtValue: any): void {
      this.setLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.JWT_TOKEN, jwtValue);
    }

    removeJWT(): void {
      this.removeLocalItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.JWT_TOKEN);
    }
    getLocalItem(key: string): any {
        let s = localStorage.getItem(key);
        if (s != null && (s.startsWith('{') || s.startsWith('['))) {
            return JSON.parse(s);
        }
        return s;
    }

    clearLocalItems(): void {
        localStorage.clear();
        this.storageChanged.emit('');
    }

    removeLocalItem(key: string): void {
        localStorage.removeItem(key);
        this.storageChanged.emit(key);
    }

    getSessionKeys(): string[] {
        let keys = new Array<string>();
        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i);
            if (key != null && key.length > 0) {
                keys.push(key);
            }
        }
        return keys;
    }

    hasSessionItem(key: string): boolean {
        let v = sessionStorage.getItem(key);
        return (v != null && v.length > 0);
    }

    setSessionItem(key: string, value: any): void {
        let s = (typeof value);
        if(s == 'object') {
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, value);
        }
        this.storageChanged.emit(key);
    }

    getSessionItem(key: string): any {
        let s = sessionStorage.getItem(key);
        if (s != null && (s.startsWith('{') || s.startsWith('['))) {
            return JSON.parse(s);
        }
        return s;
    }

    clearSessionItems(): void {
        sessionStorage.clear();
        this.storageChanged.emit('');
    }

    removeSessionItem(key: string): void {
        sessionStorage.removeItem(key);
        this.storageChanged.emit(key);
    }

}