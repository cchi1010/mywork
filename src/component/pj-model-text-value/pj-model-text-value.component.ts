import { Component, Input, OnInit } from '@angular/core';
import { ArrayIsNotEmpty, HasStringValue } from '../components.global';

@Component({
  selector: 'pj-model-text-value',
  templateUrl: './pj-model-text-value.component.html',
  styleUrls: ['./pj-model-text-value.component.scss']
})
export class PjModelTextValueComponent implements OnInit {

  @Input()
  modelName: string = '';

  @Input()
  modelIconName: string = '';

  @Input()
  modelData?: any;

  @Input()
  fieldsTextValue?: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

  hasIcon(): boolean {
    return HasStringValue(this.modelIconName);
  }
  getIconName(): string {
    return this.modelIconName;
  }
  getTitle(): string {
    return this.modelName;
  }

  private _fieldTextValues?: Array<string>;
  getFieldValues(): Array<string> {
    if (!ArrayIsNotEmpty(this._fieldTextValues)) {
      this._fieldTextValues = this.convertValueToStringArray();
    }
    return this._fieldTextValues || [];
  }

  private convertValueToStringArray(): Array<string> {
    if (ArrayIsNotEmpty(this.fieldsTextValue)) {
      return this.fieldsTextValue || [];
    }
    if (this.modelData == null) {
      return [];
    }
    let values = new Array<string>();
    for (let p in this.modelData) {
      values.push(this.modelData[p]);
    }
    return values;
  }
}
