import { Directive, ElementRef, Input, OnInit, SimpleChanges } from "@angular/core";
import { PJ_SIZE } from "src/component/components.global";

@Directive({
    selector: '[pjSize]',
})
export class PjSizeDirective implements OnInit {

    @Input('pjSize')
    _size: string = PJ_SIZE.MEDIUM;

    constructor(private elm: ElementRef) { }
    ngOnInit(): void {
        //假设需要size的组件其selector下一定有一个<div>标签
        this.elm.nativeElement.classList.add(this._size || PJ_SIZE.MEDIUM);
        if (this.elm.nativeElement.children[0] != null) {
            this.elm.nativeElement.children[0].classList.add(this._size || PJ_SIZE.MEDIUM);
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['_size'].firstChange) {
            this.elm.nativeElement.classList.remove(changes['_size'].previousValue);
            this.elm.nativeElement.classList.add(changes['_size'].currentValue);

            this.elm.nativeElement.children[0].classList.remove(changes['_size'].previousValue);
            this.elm.nativeElement.children[0].classList.add(changes['_size'].currentValue);
        }
    }
}

@Directive({
    selector: '[pjDefaultSize]',
})
export class PjDefaultSizeDirective implements OnInit {

    @Input('pjDefaultSize')
    _size: string = PJ_SIZE.MEDIUM;
    constructor(private _elm: ElementRef) { }
    ngOnInit(): void {
        let hasSizeStyle = false;
        [
            PJ_SIZE.EXTRA_SMALL, PJ_SIZE.SMALL, PJ_SIZE.MEDIUM, PJ_SIZE.LARGE, PJ_SIZE.EXTRA_LARGE, PJ_SIZE.EXTRA_2LARGE
        ].forEach(aSize => {
            if (this._elm?.nativeElement.classList.contains(aSize)) {
                hasSizeStyle = true;
            }
        });
        if (!hasSizeStyle) {
            this._elm?.nativeElement.classList.add(this._size);
        }
    }
}
