import { HelperService } from 'src/service/helper.service';
import { Component, EventEmitter, Input, OnInit, Output,SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HasStringValue, NgFormValidator, PJ_SIZE, PjTextEntryData, isFalse, isTrue } from 'src/component/components.global';

@Component({
  selector: 'pj-date',
  templateUrl: './pj-date.component.html',
  styleUrls: ['./pj-date.component.scss']
})
export class PjDateComponent implements OnInit {

  @Input()
  onCard: boolean = false;

  @Input()
  label: string = 'Date';

  @Input()
  assistiveText: string = '';
  @Input()
  timeMustBeLaterThan?: Date;
  @Input()
  timeMustBeEarlierThan?: Date;

  @Input()
  dateFormat: string = this.onCard ? 'MM/YY' : 'MM/DD/YYYY';

  @Input()
  pjSize: string = 'xl';
  @Input()
  dateValue?: Date;
  @Input()
  disabled?: boolean;
  @Input()
  groupErrorMsg?: string;

  @Input()
  noInput?: boolean;


  @Output()
  dateChanged = new EventEmitter<string>();

  private _dateEntryData?: PjTextEntryData;

  private _formControl: FormControl<string | null> = new FormControl<string>('', [
    // NgFormValidator.dateForUS(),
    NgFormValidator.timeMustBeLaterThan(this.timeMustBeLaterThan, this.groupErrorMsg),
    NgFormValidator.timeMustBeEarlierThan(this.timeMustBeEarlierThan, this.groupErrorMsg),
  ]);

  constructor() { }

  ngOnInit(): void {
    if (this._dateEntryData == null) {
      this._dateEntryData = {
        label: this.label, placeholder: this.dateFormat, assistiveText: this.assistiveText, maxLength: 10,
        labelled: false, leftPadding: 32, disabled: this.disabled, groupErrorMsg: this.groupErrorMsg
      }
      if (HasStringValue(this.label)) {
        this._dateEntryData.labelled = true;
      }
      if (this.pjSize === PJ_SIZE.EXTRA_LARGE) {
        this._dateEntryData.leftPadding = 48;
      } else if (this.pjSize === PJ_SIZE.LARGE) {
        this._dateEntryData.leftPadding = 40;
      } else {
        this._dateEntryData.leftPadding = 32;
      }
    }
    this._formControl.valueChanges.subscribe(text => {
      if(this.onCard) {
        // if (text !== null && text?.length == 4 && !text.includes('/')) {
        //   this._formControl.setValue(text.substring(0, 2) + '/' + text.substring(2));
        // }
        if(this._formControl.valid && this._formControl.value?.length == 5) {
          this.dateChanged.emit(this._formControl.value || '');
        }
      } else {
        // if (text !== null && text?.length == 8 && !text.includes('/')) {
        //   this._formControl.setValue(text.substring(0, 2) + '/' + text.substring(2, 4) + '/' + text.substring(4));
        // }
        if(this._formControl.valid && this._formControl.value?.length == 10) {
          this.dateChanged.emit(this._formControl.value || '');
        }
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(isFalse(this.onCard)) {
      this._formControl.addValidators(NgFormValidator.dateForUS());
    } else {
      this._formControl.addValidators(NgFormValidator.cardExpireDate());
    }

    if (this.dateValue != null) {
      if(isFalse(this.onCard)) {
        this._formControl.setValue(HelperService.formatDateTime(this.dateValue, 'MM/dd/yyyy'));
      } else {
        this._formControl.setValue(HelperService.formatDateTime(this.dateValue, 'MM/yy'));
      }
    } 
    if (isTrue(this.disabled)) {
      this._dateEntryData = {
        label: this.label, placeholder: this.dateFormat, assistiveText: this.assistiveText, maxLength: 10,
        labelled: false, leftPadding: 32, disabled: this.disabled, groupErrorMsg: this.groupErrorMsg
      }

    }
    if (HasStringValue(this.groupErrorMsg)) {
      this._dateEntryData = {
        label: this.label, placeholder: this.dateFormat, assistiveText: this.assistiveText, error: true, maxLength: 10,
        labelled: false, leftPadding: 32, disabled: this.disabled, groupErrorMsg: this.groupErrorMsg
      }
    } else {
      this._dateEntryData = {
        label: this.label, placeholder: this.dateFormat, assistiveText: this.assistiveText, error: false,
        labelled: false, leftPadding: 32, disabled: this.disabled, groupErrorMsg: '', maxLength: 10,
      }
    }
    if (HasStringValue(this.label)) {
      this._dateEntryData.labelled = true;
    }
    if (this.pjSize === PJ_SIZE.EXTRA_LARGE) {
      this._dateEntryData.leftPadding = 48;
    } else if (this.pjSize === PJ_SIZE.LARGE) {
      this._dateEntryData.leftPadding = 40;
    } else {
      this._dateEntryData.leftPadding = 32;
    }

  }
  getDateEntryConfig(): PjTextEntryData {
    return this._dateEntryData || {};
  }

  getFormControl(): FormControl {
    return this._formControl;
  }

  getSize(): string {
    return this.pjSize;
  }
  pickDate(date: string): void {
    const dateNewformat=date.replace(/-/g,'/');
    // this.dateValue=new Date(date.replace(/-/g,'/'));   //此处如果设置了datevalue，会导致datevalue的值不能通过输入的方法更改，_formControl的方法需要重新考虑
    // if (this.onCard){
    //   this._formControl.setValue(HelperService.formatDateTime(dateNewformat, 'MM/yy'));
    //   this.dateChanged.emit(HelperService.formatDateTime(dateNewformat, 'MM/yy'));
    // }else{
      this._formControl.setValue(HelperService.formatDateTime(dateNewformat, 'MM/dd/yyyy'));
      this.dateChanged.emit(HelperService.formatDateTime(dateNewformat, 'MM/dd/yyyy'));
    // }
  }

  isExpireDate(): boolean {
    return this.onCard;
  }
}
