import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PJ_COMPONENT_STYLE, HasStringValue, PjActionEvent, PJ_ACTION, NgFormValidator } from 'src/component/components.global';

@Component({
  selector: 'pj-input-dropdown-cell',
  templateUrl: './pj-input-dropdown-cell.component.html',
  styleUrls: ['./pj-input-dropdown-cell.component.scss']
})
export class PjInputDropdownCellComponent implements OnInit {

  @Input()
  cellInfo?: string;

  @Output()
  setValue = new EventEmitter<string>();
  @Output()
  deleteColumn = new EventEmitter<boolean>();
  


  ngOnInit(): void {
    this._inputEmpty=false;
  }

  private _nameFormControl: FormControl = new FormControl('', NgFormValidator.required('Column name can not be empty.'));
  getFormControl(): FormControl {
    return this._nameFormControl;
  }

  deleteThisColumn(): void {
   this.deleteColumn.emit(true);
   this._popOver=false;
  }

  isCellEmpty(): boolean {
    return !HasStringValue(this.cellInfo);
  }
  getInputText(): string {
    return this.cellInfo || '';
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
      this._popOver=false;
    }else{
      this._inputEmpty=true;
    }
  }
  deleteInput():void{
    this.cellInfo='';
  }

  closePopOver():void{
    setTimeout(() => {
      if (!this.focusInput){
        this._popOver=false;
      } 
    }, 200);

  }

  trySaveEditInput(e: any): void {
    this.focusInput=false;
    if (HasStringValue(e.target.value)) {
      this.onSaveInputText(e.target.value);
    }
  }

  private _popOver:boolean=false;
  isPopOver():boolean{
    return this._popOver;
  }
  private focusInput: boolean = false;
  showPopOver():void{
    this._popOver=true;
  }

  focusOnInput():void{
    this.focusInput=true;
  }

}


