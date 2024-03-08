import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PjSliderComponent } from './pj-slider.component';
@Component({
  selector: 'pj-double-slider',
  templateUrl: './pj-double-slider.component.html',
  styleUrls: ['./pj-double-slider.component.scss'],
})

export class PjDoubleSliderComponent extends PjSliderComponent {



  @ViewChild('lowSliderElm')
  private _lowSliderElm?: ElementRef;

  @ViewChild('highSliderElm')
  private _highSliderElm?: ElementRef;

  @ViewChild('lowValueLabelElm')
  private _lowValueLabelElm?: ElementRef;
  @ViewChild('highValueLabelElm')
  private _highValueLabelElm?: ElementRef;

  @Input()
  sign?:string;

  private _lowValueLabelWidth: number = 0;

  private _highValueLabelWidth: number = 0;


  ngAfterViewChecked(): void {
    this._lowValueLabelWidth = this._lowValueLabelElm?.nativeElement.offsetWidth;
    this._highValueLabelWidth = this._highValueLabelElm?.nativeElement.offsetWidth;
    this._leftOffset = this._leftElm?.nativeElement.offsetWidth + 8 + 10;
    if (Number.isNaN(this._leftOffset)) {
      this._leftOffset = 10;
    }
    this._reCalcRatio();
    this._calLabelLocation(this._lowSliderElm?.nativeElement);
  }

  getLowValue():string {
    return (this.sign||'')+(this.sliderData.lowValue).toString();
  }

  getHighValue(): string {
    return (this.sign||'')+ (this.sliderData.highValue || 0).toString();
  }

  private _lowValue: number = 0;
  getLowElmValue(): number {
    if (this._switchLowHighElm) {
      if (this._lowValue != (this.sliderData.highValue || 0)) {
        this._lowValue = this.sliderData.highValue || 0;
        this._reCalcRatio();
      }
    } else {
      if (this._lowValue != this.sliderData.lowValue) {
        this._lowValue = this.sliderData.lowValue;
        this._reCalcRatio();
      }
    }
    return this._lowValue;
  }

  private _highValue: number = 0;
  getHighElmValue(): number {
    if (this._switchLowHighElm) {
      if (this._highValue != this.sliderData.lowValue) {
        this._highValue = this.sliderData.lowValue;
        this._reCalcRatio();
      }
    } else {
      if (this._highValue != (this.sliderData.highValue || 0)) {
        this._highValue = (this.sliderData.highValue || 0);
        this._reCalcRatio();
      }
    }
    return this.sliderData.highValue || 0;
  }

  onLowValueChange(elm: HTMLInputElement): void {
    // this.lowValue = Number.parseInt(elm.value);
    this._reCalcLowValue(Number.parseInt(elm.value));
    this._reCalcRatio();
    this._calLabelLocation(elm);
    this.valueChange.emit({ lowValue: this.sliderData.lowValue, highValue: this.sliderData.highValue || 0 });
  }

  onHighValueChange(elm: HTMLInputElement): void {
    this._reCalcHighValue(Number.parseInt(elm.value));
    this._reCalcRatio();
    this._calLabelLocation(elm);
    this.valueChange.emit({ lowValue: this.sliderData.lowValue, highValue: this.sliderData.highValue || 0 });
  }

  private _switchLowHighElm: boolean = false;
  private _reCalcLowValue(v: number): void {
    if (v > (this.sliderData.highValue || 0)) {
      if (!this._switchLowHighElm) {
        this._switchLowHighElm = true;
        this.sliderData.lowValue = this.sliderData.highValue || 0;
      }
      this.sliderData.highValue = v;
    } else {
      if (this._switchLowHighElm) {
        this.sliderData.highValue = v;
        if (v <= this.sliderData.lowValue) {
          this._switchLowHighElm = false;
        }
      } else {
        this.sliderData.lowValue = v;
      }
    }
  }

  private _reCalcHighValue(v: number): void {
    if (v < this.sliderData.lowValue) {
      if (!this._switchLowHighElm) {
        this._switchLowHighElm = true;
        this.sliderData.highValue = this.sliderData.lowValue;
      }
      this.sliderData.lowValue = v;
    } else {
      if (this._switchLowHighElm) {
        this.sliderData.lowValue = v;
        if (v >= (this.sliderData.highValue || 0)) {
          this._switchLowHighElm = false;
        }
      } else {
        this.sliderData.highValue = v;
      }
    }
  }

  private _reCalcRatio(): void {
    let r1 = (this.sliderData.lowValue - this.sliderData.min + 1) / (this.sliderData.max - this.sliderData.min);
    let r2 = ((this.sliderData.highValue || 0) - this.sliderData.min) / (this.sliderData.max - this.sliderData.min);
    if (this._lowSliderElm != null) {
      let e = this._lowSliderElm.nativeElement;
      e.style.setProperty('--ratio1', r1 * 100 + '%');
      e.style.setProperty('--ratio2', r2 * 100 + '%');
    }
    if (this._highSliderElm != null) {
      let e = this._highSliderElm.nativeElement;
      e.style.setProperty('--ratio1', r1 * 100 + '%');
      e.style.setProperty('--ratio2', r2 * 100 + '%');
    }
  }

  private _calLabelLocation(e: HTMLInputElement): void {
    if (!this.sliderData.valueShown) {
      return;
    }
    let lowLabel = this._lowValueLabelElm?.nativeElement;
    let lowLabelLoc = (
      (this.sliderData.lowValue - this.sliderData.min)
      / (this.sliderData.max - this.sliderData.min)
      * ((e.clientWidth || 0) - 20)
      - (this._lowValueLabelWidth / 2)
      + this._leftOffset) + 'px';
    lowLabel.style.setProperty('--lowLabelLoc', lowLabelLoc);

    let highLabel = this._highValueLabelElm?.nativeElement;
    let highLabelLoc = (
      ((this.sliderData.highValue || 0) - this.sliderData.min)
      / (this.sliderData.max - this.sliderData.min)
      * ((e.clientWidth || 0) - 20)
      - (this._highValueLabelWidth / 2)
      - this._lowValueLabelWidth + this._leftOffset) + 'px';
    highLabel.style.setProperty('--highLabelLoc', highLabelLoc);
  }
}
