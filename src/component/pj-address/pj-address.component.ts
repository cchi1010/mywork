import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  PjActionEvent,
  PjAddress,
  PJ_ACTION,
} from 'src/component/components.global';

@Component({
  selector: 'pj-address',
  templateUrl: './pj-address.component.html',
  styleUrls: ['./pj-address.component.scss'],
})
export class PjAddressComponent implements OnInit {
  @Input()
  addressType: 'normal' | 'detail' = 'normal'; // 可以是： normal | detail

  @Input()
  address?: PjAddress;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  constructor() {}

  ngOnInit(): void {}

  getAddressTypeClass(): string {
    let addressTypeClass = this.addressType + 'Type';
    if (this.addressType == 'normal' && this.address?.isDefault) {
      addressTypeClass = 'defaultType';
    }
    return addressTypeClass;
  }

  getCityProvinceAndPostcode(): string {
    return PjAddress.getCityProvinceAndPostcode(this.address);
  }
  getName(): string {
    return PjAddress.getFullName(this.address);
  }
  hasAction(): boolean {
    return false;//this.addressType != 'detail';
  }
  onEditBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.EDIT });
  }
  getEditInstructionBtnColor(): string {
    return this.address?.isDefault ? 'brand' : 'secondary';
  }

  getAddressLine(): string {
    return PjAddress.getAddressLine(this.address);
  }
}
