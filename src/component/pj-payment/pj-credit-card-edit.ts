import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { GetMonthesForDropdown, GetYearsForDropdown, PjKeyValue, PjPaymentInfo } from 'src/component/components.global';
import { PjDropdownItem } from 'src/component/components.global';


@Component({ template: `` })
export class PjCreditCardEditBase {


    protected _creditFrmGrp?: FormGroup;

    @Input()
    validRules?: PjKeyValue<Array<ValidatorFn>>;

    @Output()
    cardInfoChange = new EventEmitter<PjPaymentInfo>();

    private _monthString: string = '01';
    private _yearString: string = '';

    constructor() { }

    getIssuerImage(): string {
      return PjPaymentInfo.fetchBorderedImage(this._creditFrmGrp?.getRawValue()['type']?.toLowerCase());
    }

    private _monthes?: Array<PjDropdownItem>;
    getMonth(): Array<PjDropdownItem> {
        if (this._monthes == null) {
            this._monthes = GetMonthesForDropdown();
        }
        return this._monthes || [];
    }

    getExistingMonth(): PjDropdownItem | undefined {
        let mon = this._monthes?.filter(month => month.label === this._creditFrmGrp?.getRawValue()['expiration']?.substring(0, 2));
        if (mon != null && mon.length > 0) {
            this._monthString = mon[0].label || '01';
            return mon[0];
        }
        return;
    }

    getExistingYear(): PjDropdownItem | undefined {
        let year = this._years.filter(year => year.label.substring(2) === this._creditFrmGrp?.getRawValue()['expiration']?.substring(3));
        if (year != null && year.length > 0) {
            this._monthes = GetMonthesForDropdown(new Number(year[0].value) as number);
            this._yearString = year[0].label.substring(2);
            return year[0];
        }
        return;
    }

    private _years: Array<PjDropdownItem> = GetYearsForDropdown();
    getYears(): Array<PjDropdownItem> {
        return this._years;
    }

    private _initialMonth?: PjDropdownItem;
    getMonthItem(): PjDropdownItem | undefined {
        return this._initialMonth;
    }

    yearSelected(item?: PjDropdownItem): void {
        if (item == null) {
            item = this._years[0];
        }
        this._monthes = GetMonthesForDropdown(new Number(item.value) as number);
        this._initialMonth = this._monthes[0];
        this._monthString = (this._initialMonth.label || '01');
        this._yearString = item.label.substring(2);
        this._creditFrmGrp!.get('expiration')?.setValue(this._monthString + '/' + this._yearString);
        if(this._creditFrmGrp?.valid) {
            this.cardInfoChange.emit(this._creditFrmGrp?.getRawValue());
        }
    }

    monthSelected(item: PjDropdownItem): void {
        this._monthString = (item.label || '01');
        this._creditFrmGrp!.get('expiration')?.setValue(this._monthString + '/' + this._yearString);
        if(this._creditFrmGrp?.valid) {
            this.cardInfoChange.emit(this._creditFrmGrp?.getRawValue());
        }
    }

    getFormControl(fieldName: string): FormControl {
        return this._creditFrmGrp?.get(fieldName) as FormControl;
    }
}
