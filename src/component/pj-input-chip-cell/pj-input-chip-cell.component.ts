import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PJ_COMPONENT_STYLE, HasStringValue, PjActionEvent, PJ_ACTION, NgFormValidator } from 'src/component/components.global';

@Component({
  selector: 'pj-input-chip-cell',
  templateUrl: './pj-input-chip-cell.component.html',
  styleUrls: ['./pj-input-chip-cell.component.scss']
})
export class PjInputChipCellComponent implements OnInit {

  @Input()
  cellInfo?: string;

  @Output()
  setValue = new EventEmitter<string>();

  ngOnInit(): void {
    this._inputEmpty=false;
  }

  isCellEmpty(): boolean {
    return !HasStringValue(this.cellInfo);
  }
  getInputText(): string {
    return this.cellInfo || '';
  }

  private _nameFormControl: FormControl = new FormControl('', NgFormValidator.required('Variant can not be empty.'));
  getVariantFormControl(): FormControl {
    return this._nameFormControl;
  }

  private _inputEmpty?: boolean;
  isInputEmpty(): boolean {
    return this._inputEmpty||false;
  }

  onSaveInputText(e: string): void {
    if (HasStringValue(e)) {
      this.cellInfo=e;
      this.setValue.emit(e);
      this._inputEmpty=false;
    }else{
      this._inputEmpty=true;
    }
  }
  deleteInput():void{
    this.cellInfo='';
  }

  trySaveEditInput(e: any): void {

    if (HasStringValue(e.target.value)) {
      this.onSaveInputText(e.target.value);
    }
  }



}


