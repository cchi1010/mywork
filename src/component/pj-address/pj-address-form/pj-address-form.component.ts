import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import {
  ArrayIsNotEmpty, cloneNewObjectByJSON, GetSupportedCountriesForDropdown,
  HasStringValue, PjActionEvent, PjAddress, PjCountry, PjKeyValue, PJ_ACTION, PjSwitchData
} from 'src/component/components.global';
import { PjDropdownItem } from 'src/component/components.global';
import { NgFormValidator } from '../../components.global';


@Component({
  selector: 'pj-address-form',
  templateUrl: './pj-address-form.component.html',
  styleUrls: ['./pj-address-form.component.scss'],
})
export class PjAddressFormComponent {
  @Input()
  address?: PjAddress;

  @Input()
  forShipping = false;

  @Input()
  supportedCountries?: Array<PjCountry>;

  @Input()
  saveBtnLabel: string = 'Use address';

  @Input()
  validRules?: PjKeyValue<Array<ValidatorFn>>;

  @Input()
  hasCancleButton?: boolean = true;

  @Input()
  usStates?: Array<PjDropdownItem>;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  private _countriesForDrowDown?: Array<PjDropdownItem>;

  private _includeInstruction = false;

  private _addFrmGrp?: FormGroup;

  constructor() { }

  ngOnChanges(): void {
    if (this.address != null && this.validRules != null) {
      this._addFrmGrp = PjAddress.generateNgFormGroup(this.validRules, this.address);
    } else if (this.address == null && this.validRules != null) {
      this._addFrmGrp = PjAddress.generateNgFormGroup(this.validRules, new PjAddress());
    }
  }

  onCancelBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
  }
  hasCancle(): boolean {
    return this.hasCancleButton || false;
  }

  getFormControl(fieldName: string): FormControl {
    return this._addFrmGrp?.get(fieldName) as FormControl;
  }

  onSaveBtnClick(): void {
    let _addFormValue = this._addFrmGrp?.getRawValue() as PjAddress;
    if (_addFormValue != null) {
      _addFormValue = PjAddress.updateAddressIsValid(_addFormValue)
    };

    if (!PjAddress.isValidAddress(_addFormValue)) {
      return;
    }
    PjAddress.splitFullName(_addFormValue, _addFormValue.fullName || '');
    if (!PjAddress.valid(_addFormValue)) {
      return;
    }

    if (!HasStringValue(_addFormValue.country) && ArrayIsNotEmpty(this.supportedCountries)) {
      _addFormValue.country = this.supportedCountries![0].value;
    }
    if (this.usStates != undefined) {
      _addFormValue.province = this._province || this.usStates[0].label;
    }

    let _add = cloneNewObjectByJSON(_addFormValue);
    this._addFrmGrp = PjAddress.generateNgFormGroup(this.validRules || {}, _addFormValue);
    this.actionClick.emit({
      actionString: PJ_ACTION.SAVE,
      para: { address: _add },
    });
  }

  isShippingAddress(): boolean {
    return false;// this.forShipping;
  }

  private _shippingSwitchData?: PjSwitchData;
  getShippingInstruction(): PjSwitchData {
    if (this._shippingSwitchData == null) {
      this._shippingSwitchData = { label: 'Include delivery instructions' }
    } else {
      this._shippingSwitchData.status = this._includeInstruction;
    }
    return this._shippingSwitchData;
  }

  onToggleClick(): void {
    this._includeInstruction = !this._includeInstruction;
  }

  isIncludeInstruction(): boolean {
    return this._includeInstruction;
  }

  getCountryItem(): PjDropdownItem | undefined {
    let c = this._countriesForDrowDown?.filter(country => country.value == this._addFrmGrp?.get('country')?.value);
    if (ArrayIsNotEmpty(c)) {
      return c![0];
    }
    return;
  }

  getSupportedCountries(): Array<PjDropdownItem> {
    if (!ArrayIsNotEmpty(this.supportedCountries)) {
      return [];
    }
    if (this._countriesForDrowDown == null) {
      this._countriesForDrowDown = GetSupportedCountriesForDropdown(
        this.supportedCountries || []
      );
    }
    return this._countriesForDrowDown;
  }


  getStateItem(): PjDropdownItem | undefined {
    if (this.address?.province != undefined) {
      return { label: this.address.province };
    }
    return { label: '' };
  }

  getSupportedStates(): Array<PjDropdownItem> {
    return this.usStates || [];
  }
  private _province: string = '';
  onStateChanged(item: PjDropdownItem): void {
    if (this.address == undefined) {
      this.address = new PjAddress;
    }
    this.address.province = item.label;
    this._province = item.label;
  }

  isChecked(): boolean {
    if (this.address?.id == 1) {
      return true;
    }
    return this.address?.isDefault || false;
  }

  private _properties: Array<{ key: string, value: string }> = [{
    key: 'House', value: 'house',
  }, {
    key: 'Apartment', value: 'apartment',
  }, {
    key: 'Business', value: 'business',
  }, {
    key: 'Others', value: 'other_houses'
  }]

  getPropertyType(): Array<{ key: string, value: string }> {
    return this._properties;
  }

  getSaveBtnLabel(): string {
    return this.saveBtnLabel;
  }

  private _noPhoneNum?: boolean;
  notInputPhone(): boolean {
    return this._noPhoneNum || false;
  }
  invaliedInput(): boolean {
    let _addFormValue = this._addFrmGrp?.getRawValue() as PjAddress;
    if (_addFormValue != null) {
      _addFormValue = PjAddress.updateAddressIsValid(_addFormValue)
    };
    return !PjAddress.isValidAddress(_addFormValue);
  }

}
