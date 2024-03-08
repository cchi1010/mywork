import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ArrayIsNotEmpty, DIRECTION, PjCheckboxItem, PjRadioItem } from '../components.global';
import { PjChoiceItemDirective } from './pj-choice-item.derictive';

@Component({
    selector: 'pj-choice-group',
    template: ``,
    styleUrls: [],
})
export abstract class PjChoiceGroupComponent implements OnInit {

    @ContentChildren(PjChoiceItemDirective, { descendants: true })
    itemContentList?: QueryList<PjChoiceItemDirective>;

    directions = DIRECTION;

    @Input()
    items?: Array<PjRadioItem | PjCheckboxItem>;

    @Input()
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input()
    bordered: boolean = true;

    protected _type = '';

    constructor() { }

    abstract ngOnInit(): void;

    ngAfterContentInit(): void {
        if (this.itemContentList == null || ArrayIsNotEmpty(this.items)) {
            return;
        }
        this.items = new Array<PjRadioItem | PjCheckboxItem>();
        this.itemContentList.forEach(item => {
            let choiceData: PjRadioItem | PjCheckboxItem = {
                value: item.itemValue || '',
                checked: item.groupItem?.checked
            };
            this.items?.push(choiceData);
        });
        this.itemContentList.forEach(item => item.bindClickHandler(this.itemContentList!, this, this.onItemClick));
    }

    hasItem(): boolean {
        return !((this.items == null) || (this.items.length == 0));
    }

    abstract onItemClick(item: PjRadioItem | PjCheckboxItem, that?: PjChoiceGroupComponent, choiceItems?: QueryList<PjChoiceItemDirective>): void;

    getGroupClass(): string {
        let c = '';
        if (this.bordered) {
            c = 'bordered '
        }
        if (this.direction == DIRECTION.H) {
            c = c + 'flex flex-row justify-evenly';
        } else {
            c = c + 'flex flex-col gap-2';
        }
        return c;
    }

    isRadio(): boolean {
        return this._type === 'radio';
    }

    isCheckbox(): boolean {
        return this._type === 'checkbox';
    }

    hasChoiceItem(): boolean {
        return (this.itemContentList != null && this.itemContentList.length > 0);
    }
}
