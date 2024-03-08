import { Component, Input, OnInit } from '@angular/core';
import { ArrayIsNotEmpty, HasStringValue } from '../components.global';

@Component({
  selector: 'pj-model-image-text-value',
  templateUrl: './pj-model-image-text-value.component.html',
  styleUrls: ['./pj-model-image-text-value.component.scss']
})
export class PjModelImageTextValueComponent implements OnInit {

  @Input()
  modelName: string = '';
  @Input()
  modelSubTitle: string = '';

  @Input()
  modelIconName: string = '';
  @Input()
  modelImageName: string = '';

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
  hasImage(): boolean {
    return HasStringValue(this.modelImageName);
  }
  getIconName(): string {
    return this.modelIconName;
  }
  getImageName(): string {
    return this.modelImageName;
  }
  getTitle(): string {
    return this.modelName;
  }
  getSubTitle():string{
    return this.modelSubTitle;
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
