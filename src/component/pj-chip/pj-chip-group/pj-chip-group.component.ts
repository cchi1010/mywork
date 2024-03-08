import { Component, Input, OnInit } from '@angular/core';
import { PjChipData } from 'src/component/components.global';


@Component({
  selector: 'pj-chip-group',
  templateUrl: './pj-chip-group.component.html',
  styleUrls: ['./pj-chip-group.component.scss'],
})
export class PjChipGroupComponent implements OnInit {
  @Input()
  chips?: Array<PjChipData>;

  constructor() { }

  ngOnInit(): void { 
    if (this.chips!=null){     
      this.chips.sort((a,b)=>Number(b.selected)-Number(a.selected));  
    }
  }

  onRightBtnClick(): void { }

  onLeftBtnClick(): void { }

  shiftChipitem(index:number): void {
    if (this.chips!=null){
      this.chips[index].selected=!this.chips[index].selected;
      this.chips.sort((a,b)=>Number(b.selected)-Number(a.selected)); 
    }
  }
}
