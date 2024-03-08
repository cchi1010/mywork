import { Directive, ElementRef, Input, NgModule } from "@angular/core";
import { Subject, takeUntil, tap } from "rxjs";
import { AppConfigService } from "src/app/app.config";

@Directive({
    selector: '[PjSticky]',
})
export class PjStickyDirective {

    @Input()
    stickyType: 'fixed' | 'absolute' = 'absolute';

    @Input()
    stickyBottomElm?: HTMLDivElement;

    private _actualTop?: number;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // private _positionChanged = new Subject<void>();
    // private _positionChangedObservable = this._positionChanged.pipe(debounceTime(25));

    constructor(private _selfElm: ElementRef, private _appConfig: AppConfigService) {
        this._appConfig.timerEvent().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => this._resetElmStyle());
        // this._positionChangedObservable.subscribe(() => this._resetElmStyle());
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // @HostListener('window:resize')
    // onResize() {
    //     this._positionChanged.next();
    // }

    // @HostListener('window:scroll')
    // onScroll() {
    //     this._positionChanged.next();
    // }

    private _resetElmStyle(): void {
        let left = 0;
        let top = 0;
        if (this._actualTop == null) {
            this._actualTop = this._getElementTop();
        }
        if (this.stickyType == 'fixed') {
            left = this._getElementLeft();
            top = this._actualTop;
        } else {
            if (this._isAngularComponent(this._selfElm)) {
                left = this._selfElm.nativeElement.firstChild.offsetLeft + window.scrollX;
                top = this._selfElm.nativeElement.firstChild.offsetTop + window.scrollY;
            } else {
                left = this._selfElm.nativeElement.offsetLeft;
                top = this._selfElm.nativeElement.offsetTop;
            }
        }
        let elmWidth = this._selfElm.nativeElement.offsetParent.offsetWidth;
        // if (this._isAngularComponent(this._selfElm)) {
        //     elmWidth = this._selfElm.nativeElement.firstChild.offsetWidth;
        // } else {
        //     elmWidth = this._selfElm.nativeElement.offsetWidth;
        // }

        const elmHeight = this._selfElm.nativeElement.firstChild.offsetHeight;
        if (elmHeight != 0 && elmWidth != 0) {
            if (this.stickyBottomElm?.offsetTop != null && ((top + elmHeight) > this.stickyBottomElm?.offsetTop)) {
                top = (this.stickyBottomElm?.offsetTop - elmHeight - 16);
            }
            this._selfElm.nativeElement.setAttribute('style',
                'position: ' + this.stickyType + ';' + 'top: ' + (top<0?0:top) + 'px; '
                + 'left: ' + left + 'px; ' + 'width: ' + elmWidth + 'px; ');
        } else {
            this._actualTop = undefined;
        }
    }

    private _getElementLeft(): number {
        let actualLeft: number = this._selfElm.nativeElement.offsetLeft;
        let current: any = this._selfElm.nativeElement.offsetParent;

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    }

    private _getElementTop(): number {
        let actualTop: number = this._selfElm.nativeElement.offsetTop;
        var current: any = this._selfElm.nativeElement.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    }

    private _isAngularComponent(elm: ElementRef): boolean {
        let tag = elm.nativeElement.tagName as string;
        if (tag.startsWith('PJ-')) {
            return true;
        }
        if (tag.startsWith('AM-')) {
            return true;
        }
        return false;
    }
}

@NgModule({
    declarations: [
        PjStickyDirective
    ],
    imports: [
    ],
    exports: [
        PjStickyDirective
    ]
})
export class PjStickyDirectiveModule { }
