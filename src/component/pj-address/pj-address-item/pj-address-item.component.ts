import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PjAddress } from 'src/component/components.global';

@Component({
  selector: 'pj-address-item',
  templateUrl: './pj-address-item.component.html',
  styleUrls: ['./pj-address-item.component.scss'],
})
export class PjAddressItemComponent implements OnInit {
  @Input()
  address?: PjAddress;

  constructor() {}
  ngOnInit(): void {}

  getName(): string {
    return PjAddress.getFullName(this.address);
  }

  getAddressDetail(): string {
    return PjAddress.getFullAddress(this.address);
  }
}
