import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPCONSTANT } from 'src/app/app.constant';
import { HasStringValue, PJ_COMPONENT_CONST } from '../components.global';

@Component({
  selector: 'pj-quick-edit',
  templateUrl: './pj-quick-edit.component.html',
  styleUrls: ['./pj-quick-edit.component.scss']
})
export class PjQuickEditComponent implements OnInit {

  @Input()
  fieldLabel: string = '';

  @Input()
  fieldValue?: string;

  @Input()
  hideValue: boolean = false;

  @Input()
  fieldDescription?: string;

  @Input()
  buttonLabel?: string;

  @Input()
  emitEvent: boolean = true;

  @Output()
  btnClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getFieldLabel(): string {
    return this.fieldLabel;
  }

  getValueClass(): string {
    return this.hasFieldDesc() ? 'value' : 'description';
  }
  hasFieldValue(): boolean {
    return HasStringValue(this.fieldValue);
  }

  hasFieldDesc(): boolean {
    return HasStringValue(this.fieldDescription);
  }

  getFieldValue(): string {
    return this.hideValue ? PJ_COMPONENT_CONST.HIDDEN_MASK_STRING : this.fieldValue!;
  }

  getFieldDesc(): string {
    return this.fieldDescription!;
  }

  hasButton(): boolean {
    return HasStringValue(this.buttonLabel);
  }

  getButtonLabel(): string {
    return this.buttonLabel!;
  }

  onBtnClick(): void {
    if (this.emitEvent) {
      this.btnClick.emit();
    }
  }
}
