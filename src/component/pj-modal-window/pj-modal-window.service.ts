// 使用服务的方式使用modal-window.
import { ComponentRef, EventEmitter, Injectable, Type } from "@angular/core";
import { filter } from "rxjs";
import { ComponentService } from "src/service/component.service";
import { HasStringValue, PjRemoveData } from "../components.global";
import { PjDlgRemoveComponent } from "./pj-dlg-remove/pj-dlg-remove.component";
import { PjModalWindowComponent } from "./pj-modal-window.component";


@Injectable()
export class PjModalWindowService {

  private _winRef?: ComponentRef<PjModalWindowComponent | PjDlgRemoveComponent>

  private _comRef?: ComponentRef<any>;

  constructor(protected _compService: ComponentService) { }

  openModalWindow(modalWinPara: any, contentComponentType: Type<any>, contentPara: any, that?: any, eventName?: string,
    actionEventHandler?: (actionEvent: any, that?: any) => void): void {
    this._show(PjModalWindowComponent, modalWinPara, contentComponentType, contentPara, that, eventName, actionEventHandler);
  }

  openRemoveWindow(contentComponentType: Type<any> | undefined, contentPara: any, removeData?: PjRemoveData,
    that?: any, actionEventHandler?: (actionEvent: any, that?: any) => void): void {
    this._show(PjDlgRemoveComponent, { removeData: removeData }, contentComponentType, contentPara, that, '', actionEventHandler);
  }

  private _show(modalWinType: Type<PjModalWindowComponent | PjDlgRemoveComponent>, modalWinPara: any,
    contentComponentType: Type<any> | undefined, contentPara: any, that?: any,
    eventName?: string, actionEventHandler?: (actionEvent: any, that?: any) => void): void {
    this.closeModalWin();
    this._winRef = this._compService.attachView(modalWinType, modalWinPara);
    if (!HasStringValue(eventName) && actionEventHandler != null) {
      (this._winRef.instance as PjDlgRemoveComponent).actionClick.subscribe(actionEvent => actionEventHandler(actionEvent, that));
    }
    if (contentComponentType == null) {
      return;
    }
    this._winRef.instance.getContent().pipe(
      filter(v => v != null)
    ).subscribe(elmRef => {
      this._comRef = this._compService.attachView(contentComponentType, contentPara, elmRef?.nativeElement);
      if (HasStringValue(eventName)) {
        let $e!: EventEmitter<any>;
        if (this._comRef?.instance[eventName!].emit != null) {
          $e = this._comRef?.instance[eventName!] as EventEmitter<any>;
        }
        if ($e != null && actionEventHandler != null) {
          $e.subscribe(ae => { actionEventHandler(ae, that) });
        }
      }
    });
  }
  closeModalWin(): void {
    if (this._comRef != null) {
      this._compService.detachView(this._comRef);
      this._comRef = undefined;
    }
    if (this._winRef != null) {
      this._compService.detachView(this._winRef);
      this._winRef = undefined;
    }
  }
}