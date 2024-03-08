// 统一处理组件需要遮盖其他部分的情况
// 例如：模态窗口，overlay窗口等

import { Directive, ElementRef, NgModule, OnDestroy } from '@angular/core';

@Directive({
    selector: '[pjModalBg]'
})
export class PjModalBgDirective implements OnDestroy {

    constructor(private _self: ElementRef) {
        this._self.nativeElement.classList.add('pj-modal-bg-css-class');
        document.body.style.overflowY = 'hidden';
    }

    ngOnDestroy(): void {
        document.body.style.overflowY = '';
    }
}

@NgModule({
    declarations: [
        PjModalBgDirective
    ],
    exports: [
        PjModalBgDirective
    ]
})
export class PjModalBgModule { }
