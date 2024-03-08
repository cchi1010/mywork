import { Directive, ElementRef, Input, NgModule } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { AppConfigService } from "src/app/app.config";

@Directive({
    selector: '[PjSectionHeigh]',
})
export class PjSectionHeightDirective {
    @Input()
    containerElm?: HTMLElement;

    @Input()
    heightReduced?: number;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private _selfElm: ElementRef, private _appConfig: AppConfigService) {
        this._appConfig.timerEvent().pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => this._resetElmStyle());
    }
    ngOnInit(): void {
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    private _addressSectionTop: number = 0;
    private _screenWidth: number = 0;
    private _screenHeight: number = 0;
    private _addressSectionHeight: number = 0;
    private _resetElmStyle(): void {
        if (this.containerElm == null) {
            return;
        }
        if (this._addressSectionTop != this.containerElm.offsetTop || this._screenWidth != document.body.offsetWidth || this._screenHeight != document.body.offsetHeight) {
            this._addressSectionTop = this.containerElm.offsetTop;
            this._screenWidth = document.body.offsetWidth;
            this._screenHeight = document.body.offsetHeight;
            let _sectionHeight = (this._screenHeight - this.containerElm.offsetTop - (this.heightReduced || 0));
            if (this._addressSectionHeight != _sectionHeight) {
                this._addressSectionHeight = _sectionHeight;
                this._selfElm.nativeElement.setAttribute('style', 'max-height:' + this._addressSectionHeight + 'px');
            }
        }
    }
}

@NgModule({
    declarations: [
        PjSectionHeightDirective
    ],
    imports: [
    ],
    exports: [
        PjSectionHeightDirective
    ]
})
export class PjSectionHeightDirectiveModule { }

