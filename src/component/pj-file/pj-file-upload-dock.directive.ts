import { Directive, ElementRef,  HostListener} from "@angular/core";

@Directive({
    selector: '[PjUploadDock]',
})
export class PjFileUploadDockDirective {
    private _fileInputElm?: ElementRef;

    @HostListener('click')
    onItemClick(): void {
        if (this._fileInputElm != null) {
            this._fileInputElm.nativeElement.click();
        }
    }

    setFileInputElm(elm: ElementRef): void {
        this._fileInputElm = elm;
    }

}