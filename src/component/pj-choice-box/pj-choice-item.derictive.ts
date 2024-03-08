import { Directive, ElementRef, Input, NgModule, QueryList } from "@angular/core";
import { PjCheckboxComponent } from "./pj-checkbox/pj-checkbox.component";
import { PjChoiceGroupComponent } from "./pj-choice-group.component";
import { PjRadioComponent } from "./pj-radio/pj-radio.component";

@Directive({
    selector: '[groupItem]',
})
export class PjChoiceItemDirective {

    @Input()
    groupItem?: PjRadioComponent | PjCheckboxComponent;

    @Input()
    itemValue?: string;

    constructor(private _elm: ElementRef) { }

    bindClickHandler(items: QueryList<PjChoiceItemDirective>, that: PjChoiceGroupComponent, groupItemClickHandler: Function): void {
        that.items?.filter(i => i.value === this.itemValue).forEach(i => {
            if (this.groupItem != null) {
                this.groupItem.checked = i.checked;
            }
            this._elm.nativeElement.addEventListener('click', () => groupItemClickHandler(i, that, items));
        });
    }
}

@NgModule({
    declarations: [
        PjChoiceItemDirective
    ],
    exports: [
        PjChoiceItemDirective
    ],
})
export class PjChoiceItemModule { }