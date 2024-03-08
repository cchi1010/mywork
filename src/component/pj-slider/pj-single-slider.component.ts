import { Component, ElementRef, ViewChild } from '@angular/core';
import { PjSliderComponent } from './pj-slider.component';

@Component({
  selector: 'pj-single-slider',
  templateUrl: './pj-single-slider.component.html',
  styleUrls: ['./pj-single-slider.component.scss'],
})
export class PjSingleSliderComponent extends PjSliderComponent {

  @ViewChild('sliderElm')
  private _sliderElm?: ElementRef;

  @ViewChild('labelElm')
  private _labelElm?: ElementRef;

  private _labelWidth: number = 0;
  
  constructor() {
    super();
    this.sliderData = { min: 0, max: 100, lowValue: 50, valueShown: true, rangeShown: true, rangeLabelLocation: 'both-ends' };
  }

  ngAfterViewInit(): void {
    let e = this._sliderElm?.nativeElement;
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    this._labelWidth = this._labelElm?.nativeElement.offsetWidth;
    this._leftOffset = this._leftElm?.nativeElement.offsetWidth + 8 + 10;
    if (Number.isNaN(this._leftOffset)) {
      this._leftOffset = 10;
    }
    this._calLabelLocation(e);
  }

  getValue(): number {
    return this.sliderData.lowValue;
  }

  onValueChange(elm: HTMLInputElement): void {
    this.sliderData.lowValue = Number.parseInt(elm.value);
    elm.style.setProperty('--value', elm.value);
    this._calLabelLocation(elm);
    this.valueChange.emit(this.sliderData.lowValue);
  }

  private _calLabelLocation(e: HTMLInputElement): void {
    if (!this.sliderData.valueShown) {
      return;
    }
    let label = this._labelElm?.nativeElement;
    let labelLoc = ((this.sliderData.lowValue - this.sliderData.min)
      / (this.sliderData.max - this.sliderData.min)
      * ((e.clientWidth || 0) - 20)
      - this._labelWidth / 2
      + this._leftOffset) + 'px';
    label.style.setProperty('--labelLoc', labelLoc);
  }
}
