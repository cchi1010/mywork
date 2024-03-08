import { HasStringValue, PjSwitchData } from 'src/component/components.global';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'pj-switch',
  templateUrl: './pj-switch.component.html',
  styleUrls: ['./pj-switch.component.scss'],
})
export class PjSwitchComponent implements OnInit {
  @Input()
  switchData?: PjSwitchData;

  @Output()
  enabledChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.switchData != null) {
      if (this.switchData.status == null) {
        this.switchData.status = false;
      }
    }
  }
  onClick(): void {
    if (this.switchData == null) {
      return;
    }
    this.switchData.status = !this.switchData.status;
    this.enabledChange.emit(this.switchData.status);
  }

  hasIcon(): boolean {
    return (
      HasStringValue(this.switchData?.enableIconName) &&
      HasStringValue(this.switchData?.disableIconName)
    );
  }

  getIconName(): string {
    return this.switchData?.status
      ? this.switchData?.enableIconName || ''
      : this.switchData?.disableIconName || '';
  }

  getToggleClass(): string {
    return this.switchData?.status ? 'on' : 'off';
  }

  hasDescription(): boolean {
    return this.switchData?.description != null &&
      this.switchData?.description.length > 0
      ? true
      : false;
  }

  getToggleDotClass(): string {
    return this.switchData?.status ? 'dot-on' : 'dot-off';
  }
}
