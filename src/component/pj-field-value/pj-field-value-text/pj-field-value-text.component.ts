import { Component, Input, OnInit } from '@angular/core';
import { DIRECTION, PjFieldValue } from 'src/component/components.global';


@Component({
  selector: 'pj-field-value-text',
  templateUrl: './pj-field-value-text.component.html',
  styleUrls: ['./pj-field-value-text.component.scss'],
})
export class PjFieldValueTextComponent implements OnInit {
  @Input()
  mixMode: boolean = false;
  @Input()
  sameFont: boolean = false;

  @Input()
  fieldValue?: PjFieldValue;

  @Input()
  direction?: string = DIRECTION.H;
  
  @Input()
  pjColor?: string='strong-neutral';

  constructor() { }

  ngOnInit(): void { }

  getFieldValueClass(): string {
    let c = this.mixMode ? ' mixMode' : '';
    if (this.sameFont){
      return ' sameFont' + ' flex flex-row justify-between ' + DIRECTION.H +' '+ this.pjColor;
    }
    if (this.direction === DIRECTION.H) {
      return c + ' flex flex-row items-center gap-1 ' + DIRECTION.H +' '+ this.pjColor;
    }
    return c + ' flex flex-col ' + DIRECTION.V+' '+ this.pjColor;
  }

  getLabel(): string {
    return this.fieldValue?.label || '';
  }

  getValue(): string {
    return this.fieldValue?.textValue || '';
  }

  hasMulityValues(): boolean {
    return this.fieldValue?.stringArray != null;
  }

  getValues(): Array<string> {
    return this.fieldValue?.stringArray || [];
  }

  hasColon(): boolean {
    if (this.sameFont){
      return false;
    }
    return this.direction === DIRECTION.H;
  }


}
