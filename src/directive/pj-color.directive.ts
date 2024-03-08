import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { PJ_COMPONENT_STYLE } from "src/component/components.global";

@Directive({
    selector: '[pjColor]',
})
export class PjColorDirective implements OnInit, OnChanges {

    @Input('pjColor')
    _color: string = PJ_COMPONENT_STYLE.PRIMARY

    constructor(private elm: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['_color'].firstChange) {
            this.elm.nativeElement.children[0].classList.remove(changes['_color'].previousValue);
            this.elm.nativeElement.children[0].classList.add(changes['_color'].currentValue);
        }
    }
    ngOnInit(): void {
        //假设需要color的组件其selector下一定有一个<div>标签
        this.elm.nativeElement.classList.add(this._color || PJ_COMPONENT_STYLE.PRIMARY);
        if (this.elm.nativeElement.children[0] != null) {
          this.elm.nativeElement.children[0].classList.add(this._color || PJ_COMPONENT_STYLE.PRIMARY);
        }
        
    }
}

@Directive({
    selector: '[pjDefaultColor]',
})
export class PjDefaultColorDirective implements OnInit {

    constructor(private _elm: ElementRef) { }

    @Input('pjDefaultColor')
    _color: string = PJ_COMPONENT_STYLE.PRIMARY

    ngOnInit(): void {
        let hasColorStyle = false;
        [
            PJ_COMPONENT_STYLE.PRIMARY, PJ_COMPONENT_STYLE.SECONDARY,
            PJ_COMPONENT_STYLE.BRAND, PJ_COMPONENT_STYLE.NEUTRAL,
            PJ_COMPONENT_STYLE.INFO, PJ_COMPONENT_STYLE.SUCCESS,
            PJ_COMPONENT_STYLE.WARN, PJ_COMPONENT_STYLE.ERROR, PJ_COMPONENT_STYLE.WHITE
        ].forEach(aColor => {
            if (this._elm?.nativeElement.classList.contains(aColor)) {
                hasColorStyle = true;
            }
        });
        if (!hasColorStyle) {
            this._elm?.nativeElement.classList.add(this._color);
        }
    }
}
