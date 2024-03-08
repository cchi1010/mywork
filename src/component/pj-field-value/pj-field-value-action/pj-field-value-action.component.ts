import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DIRECTION, PJ_SIZE } from 'src/component/components.global';
import { PjFieldValue, PjActionEvent } from 'src/component/components.global';


@Component({
  selector: 'pj-field-value-action',
  templateUrl: './pj-field-value-action.component.html',
  styleUrls: ['./pj-field-value-action.component.scss'],
})
export class PjFieldValueActionComponent implements OnInit {

  @Input()
  pjSize?: string;

  @Input()
  fieldValue?: PjFieldValue;

  @Input()
  direction?: string = DIRECTION.H;

  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  constructor() {}

  ngOnInit(): void {}

  getFieldValueClass(): string {
    let c = '';
    if (this.direction === DIRECTION.H) {
      return c + ' flex flex-row items-center gap-1 ' + DIRECTION.H;
    }
    return c + ' flex flex-col ' + DIRECTION.V;
  }

  onActionBtnClick(): void {
    this.actionClick.emit({
      actionString: this.fieldValue?.actionValue?.actionString,
      para: { data: this.fieldValue?.actionValue?.label },
    });
  }

  getLabel(): string {
    return this.fieldValue?.label || '';
  }

  getButtonLabel(): string {
    return this.fieldValue?.actionValue?.label || '';
  }
  getButtonSize(): string {
    return this.pjSize || PJ_SIZE.MEDIUM;
  }

  hasColon(): boolean {
    return this.direction === DIRECTION.H ;
  }

  getIconName(): string {
    // return this.fieldValue?.actionValue?.iconName || '';
    return this.fieldValue?.iconPlace=='left'?'':(this.fieldValue?.actionValue?.iconName||'');
  }
  getLeftIconName():string{ 
    return this.fieldValue?.iconPlace=='left'?(this.fieldValue?.actionValue?.iconName||''):'';
  }
}
