
import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'pj-date-picker',
  templateUrl: './pj-date-picker.component.html',
  styleUrls: ['./pj-date-picker.component.scss']
})
export class PjDatePickerComponent implements OnInit {
  @Output()
  pickedDate = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(e: any): void {
    this.pickedDate.emit(e.target.value);
  }


}
