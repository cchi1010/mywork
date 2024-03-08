import { ComponentRef, Injectable } from "@angular/core";
import { ComponentService } from "src/service/component.service";
import { PjHelperBoxComponent } from "./pj-helper-box.component";
import { PjHelperItem } from "../components.global";


@Injectable()
export class PjHelperBoxService {

    private _helperBoxRef?: ComponentRef<PjHelperBoxComponent>;

    constructor(private _compService: ComponentService) { }

    show(dockElm: HTMLElement, items: Array<PjHelperItem>): void {
        if (this._helperBoxRef == null) {
            this._helperBoxRef = this._compService.attachView(PjHelperBoxComponent, { helperItems: items }, dockElm);
            this._helperBoxRef.instance.closeBtnClick.subscribe(() => {
                this._destroy();
            });
        } else {
            this._destroy();
        }

    }
    private _destroy(): void {
        if (this._helperBoxRef != null) {
            this._compService.detachView(this._helperBoxRef);
            this._helperBoxRef = undefined;
        }
    }
}