import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PjSliderData } from "../components.global";


@Component({
    selector: 'pj-slider',
    template: ``,
    styleUrls: [],
})
export class PjSliderComponent implements OnInit {

    @ViewChild('leftElm')
    protected _leftElm?: ElementRef;

    @Input()
    sliderData: PjSliderData = { min: 0, max: 100, lowValue: 50, valueShown: true, rangeShown: true, rangeLabelLocation: 'both-ends' };

    @Output()
    valueChange = new EventEmitter<number | { lowValue: number, highValue: number }>();

    protected _leftOffset: number = 0;
    constructor() { }

    ngOnInit(): void { 
        
    }

    getMinValue(): number {
        return this.sliderData.min;
    }

    getMaxValue(): number {
        return this.sliderData.max;
    }
    isBothends(): boolean {
        return this.sliderData.rangeShown && (this.sliderData.rangeLabelLocation === 'both-ends');
    }

    isBeneath(): boolean {
        return this.sliderData.rangeShown && (this.sliderData.rangeLabelLocation === 'beneath');
    }

    hasRangeLabel(): boolean {
        return this.sliderData.rangeShown;
    }

    isValueShown(): boolean {
        return this.sliderData.valueShown;
    }

    getRowColClass(): string {
        if (this.sliderData.rangeLabelLocation === 'both-ends') {
            return 'flex-row gap-2 items-center';
        }
        if (this.sliderData.rangeLabelLocation === 'beneath') {
            return 'flex-col';
        }
        return '';
    }
}