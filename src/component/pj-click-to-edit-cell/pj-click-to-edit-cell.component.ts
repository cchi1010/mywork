import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PJ_COMPONENT_STYLE, HasStringValue, PjActionEvent, PJ_ACTION } from 'src/component/components.global';

@Component({
  selector: 'pj-click-to-edit-cell',
  templateUrl: './pj-click-to-edit-cell.component.html',
  styleUrls: ['./pj-click-to-edit-cell.component.scss']
})
export class PjClickToEditCellComponent implements OnInit {

  @Input()
  formControl:FormControl=new FormControl();

  @Input()
  cellInfo?:string;

  @Output()
  setValue = new EventEmitter<string>();

  ngOnInit(): void {
      
  }

  private _onEdit: boolean = false;
  onEdit(): boolean {
    return this._onEdit;
  }

  getCellInfo(): string {
    return this.cellInfo || '';
  }

  onEditBtnClick(): void {
    this._onEdit = true;
  }

  valueFormcontrol(): FormControl{
    return this.formControl || new FormControl();
  }

  private _tempValue?: string;
  onSaveInputText(e: string): void {
    this.formControl.setValue(e);
    this._tempValue = e;
    // this._onEdit = false;
    // setTimeout(() => {
    //   this._onEdit = false;
    // }, 500);
  }

  trySaveEditInput(e:any):void{
    if (HasStringValue(e.target.value)){
      this.onSaveInputText(e.target.value);
    }
  }

  onCheckIconClick(): void {
    if(HasStringValue(this._tempValue)) {
      this.setValue.emit(this._tempValue);
    }
    this._onEdit = false;
  }

}


