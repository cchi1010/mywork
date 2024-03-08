import { Directive, ElementRef, NgModule } from "@angular/core";

@Directive({
    selector: '[PjScreenItem]',
})
export class PjScreenItemDirective {

    static cssSelector = '[pjscreenitem]';

    constructor(private _selfElm: ElementRef) { }

    getScreenSize(): string {
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.XXXL)) {
            return ScreenSizeBreakPointString.XXXL;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.XXL)) {
            return ScreenSizeBreakPointString.XXL;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.XL)) {
            return ScreenSizeBreakPointString.XL;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.LG)) {
            return ScreenSizeBreakPointString.LG;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.MD)) {
            return ScreenSizeBreakPointString.MD;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.SM)) {
            return ScreenSizeBreakPointString.SM;
        }
        if(this._selfElm.nativeElement.classList.contains(ScreenSizeBreakPointString.XS)) {
            return ScreenSizeBreakPointString.XS;
        }
        return ScreenSizeBreakPointString.XS;
    }
}

@NgModule({
    declarations: [
        PjScreenItemDirective
    ],
    imports: [
    ],
    exports: [
        PjScreenItemDirective
    ]
})
export class PjScreenItemDirectiveModule { }

const ScreenSizeBreakPointString = { 
    ALL: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    XS: 'xs', SM: 'sm', MD: 'md', LG: 'lg', XL: 'xl', XXL: 'xxl', XXXL: 'xxxl' 
}

