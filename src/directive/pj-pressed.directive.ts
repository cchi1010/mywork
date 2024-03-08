import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[pjPressable]'
})
export class PressableDirective {

    @HostBinding('class.pressed')
    private _isPressed: boolean = false;

    constructor() { }

    @HostListener('mousedown')
    onMouseDown() {
        this._isPressed = true;
    }

    @HostListener('mouseup')
    onMouseUp() {
        this._isPressed = false;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this._isPressed = false;
    }
}
