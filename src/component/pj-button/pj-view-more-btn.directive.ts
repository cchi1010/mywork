import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { HasStringValue } from "../components.global";
import { PjButtonCtaComponent } from "./pj-button-cta/pj-button-cta.component";
import { PjButtonInlineComponent } from "./pj-button-inline/pj-button-inline.component";

@Directive({
    selector: '[pjViewMoreBtn]',
})
export class PjViewMoreBtnDirective {

    @Input()
    pjViewMoreBtn!: PjButtonCtaComponent | PjButtonInlineComponent;

    @Input()
    moreLabel: string = 'Read more';

    @Input()
    moreIconName: string = 'expand_more';

    @Input()
    lessLabel: string = 'Hide detail';

    @Input()
    lessIconName: string = 'expand_less';

    @Input()
    iconOnLeft: boolean = true;

    @Input()
    textElm?: HTMLElement;

    @Input()
    truncateLine: number = 4;

    private _showAll: boolean = false;

    ngOnInit(): void {
        this.truncateLine = ((this.truncateLine <= 6 && this.truncateLine >= 1) ? this.truncateLine : 6);
        this._setRelatedElmData();
    }
    @HostListener('click')
    onClick(): void {
        this._showAll = !this._showAll;
        this._setRelatedElmData();
    }

    private _setRelatedElmData(): void {
        if (this._showAll) {
            this.pjViewMoreBtn.label = this.lessLabel;
            this.textElm?.classList.remove('truncate-text-line-' + this.truncateLine);
            if (HasStringValue(this.moreIconName) && HasStringValue(this.lessIconName)) {
                if (this.iconOnLeft) {
                    this.pjViewMoreBtn.leftIconName = this.lessIconName;
                } else {
                    this.pjViewMoreBtn.rightIconName = this.lessIconName;
                }
            }
        } else {
            this.pjViewMoreBtn.label = this.moreLabel;
            this.textElm?.classList.add('truncate-text-line-' + this.truncateLine);
            if (HasStringValue(this.moreIconName) && HasStringValue(this.lessIconName)) {
                if (this.iconOnLeft) {
                    this.pjViewMoreBtn.leftIconName = this.moreIconName;
                } else {
                    this.pjViewMoreBtn.rightIconName = this.moreIconName;
                }
            }
        }
    }
}