import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmDataCard } from 'src/ammall/am-model/machant.model';
import { PJ_COMPONENT_STYLE, HasStringValue } from 'src/component/components.global';

@Component({
  selector: 'pj-input-data-cell',
  templateUrl: './pj-input-data-cell.component.html',
  styleUrls: ['./pj-input-data-cell.component.scss']
})
export class PjInputDataCellComponent implements OnInit {

  @Input()
  formControl:FormControl=new FormControl();
  @Input()
  buttonLabel?:string;
  @Input()
  error?:boolean;
  @Input()
  placeholder?:string;
  @Input()
  assistiveText?:string;
  @Output()
  setValue = new EventEmitter<string>();
  @Output()
  buttonClick = new EventEmitter<string>();
  constructor() { }
  
  private originalValue:string='';
  ngOnInit(): void {
    if (this.formControl.value){
      this.originalValue=this.formControl.value;
    }
  }

  getPlaceholder():string{
    return this.placeholder||'Click to edit';
  }
  getLeftPerfixSign():string{
    return '$';
  }
  isValueError():boolean{
    return this.error||false;
  }

  valueFormcontrol():FormControl{
    return this.formControl||new FormControl();
  }

  getButtonLable():string{
    return this.buttonLabel||'';
  }
  getAssistiveText():string{
    if (this.error){
      return this.assistiveText||'';
    }
    return '';
  }
  private _tempValue:string='';
  setTempValue(e:string):void{
    this.formControl.setValue(e);                //依据测试要求，目前不设置该值
    this._tempValue=e;
    this.outputValue();
    // this.formControl.setValue(this.originalValue);                //依据测试要求，目前set该值为空
    // setTimeout(() => {
    //   this.isEdit=false;
    // }, 500);
  }

  trySetValue(e:any):void{
    if (HasStringValue(e.target.value)){                 //依据测试要求，目前不设置该值
      this._tempValue=e.target.value;
    }
    this.formControl.setValue(this.originalValue);                //依据测试要求，目前set该值为原值
    setTimeout(() => {
      this.isEdit=false;
      
    }, 200);
  }

  outputValue():void{
    this.formControl.setValue(this._tempValue);  
    this.originalValue=this._tempValue;
    if(HasStringValue(this._tempValue)){
      this.setValue.emit(this._tempValue);
    }
    this.isEdit=false;
    if (this.formControl.value){
      this.originalValue=this.formControl.value;
    }
  }

  private isEdit=false;
  isFocus():boolean{
    return this.isEdit;
  }

  edit():void{
    this.isEdit=true;
  }
  buttonClicked():void{
    this.buttonClick.emit(this._tempValue);
  }
}


