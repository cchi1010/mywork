import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";
import { ComponentService } from "src/service/component.service";
import { PjTooltipComponent } from "./pj-tooltip.component";


@Directive({
    selector: '[tooltip]',
})
export class PjTooltipDirective implements OnInit {

    @Input('tooltip')
    _tooltip?: string;

    @Input('location')
    _location: 'top' | 'right' | 'bottom' | 'left' | undefined = 'bottom';

    @Input('tipAlign')
    _align: 'center'|'' = '';

    private _tooltipCompRef?: ComponentRef<PjTooltipComponent>;

    constructor(private _elm: ElementRef, private _compService: ComponentService) { }

    ngOnInit(): void {

    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (this._tooltipCompRef != null) {
            this._compService.detachView(this._tooltipCompRef);
        }
        this._tooltipCompRef = this._compService.attachView(
            PjTooltipComponent,
            { content: this._tooltip, location: this._location },
            this._elm.nativeElement.children[0]
        );
        const w = this._elm.nativeElement.offsetWidth;
        const h = this._elm.nativeElement.offsetHeight;
        const t = this._elm.nativeElement.offsetTop;
        const l = this._elm.nativeElement.offsetLeft;
        switch (this._location) {
            case 'top':
                this._tooltipCompRef.instance.setLocationStyle({ bottom: (h + 8) + 'px', left: Math.floor(w * 0.382) + 'px' });
                break;
            case 'right':
                this._tooltipCompRef.instance.setLocationStyle({ top: ((h - 40) / 2) + 'px', left: (w + 8) + 'px' });
                break;
            case 'bottom':
                if(this._align == '') {
                    this._tooltipCompRef.instance.setLocationStyle({ top: (h + 8) + 'px', left: Math.floor(w * 0.382) + 'px' });
                } else {
                    this._tooltipCompRef.instance.setLocationStyle({ top: (h + 8) + 'px', left: '10px' });
                }
                
                break;
            case 'left':
                this._tooltipCompRef.instance.setLocationStyle({ top: ((h - 40) / 2) + 'px', right: (w + 8) + 'px' });
                break;
        }

    }
    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (this._tooltipCompRef != null) {
            this._compService.detachView(this._tooltipCompRef);
        }
    }
}