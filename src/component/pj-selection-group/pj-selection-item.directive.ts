import { Directive, OnInit, ElementRef, Input, HostListener } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
    selector: '[selItem]',
})
export class PjSelectionItemDirective implements OnInit {

    @Input()
    itemSelected: boolean = false;

    clicked = new Subject<ElementRef>();
    constructor(private _elm: ElementRef) {

    }
    ngOnInit(): void {

    }

    @HostListener('click')
    onItemClick(): void {
        this.clicked.next(this._elm);
    }

    @HostListener('mousedown') 
    onMouseDown() {
        this._elm.nativeElement.children[0].classList.add('pressed');
    }

    @HostListener('mouseup') 
    onMouseUp() {
        this._elm.nativeElement.children[0].classList.remove('pressed');
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        this._elm.nativeElement.children[0].classList.remove('pressed');
    }

    getEelement(): ElementRef {
        return this._elm;
    }
}