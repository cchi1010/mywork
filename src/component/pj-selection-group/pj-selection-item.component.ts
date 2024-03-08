import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'pj-selestion-item',
    template: ``,
})
export class PjSelectionItemComponent implements OnInit {

    @Input()
    selected: boolean = false;

    @Input()
    title: string = '';

    @Input()
    description: string = '';

    constructor(private _elm: ElementRef) { }

    ngOnInit(): void {
    }

    isFocused(): boolean {
        return this._elm.nativeElement.children[0].classList.contains('focused');
    }

    getSelectedClass(): string {
        return this.selected ? 'focused' : '';
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getCheckedName(): string {
        return this.isFocused() ? 'check_circle' : 'radio_button_unchecked';
    }
}
