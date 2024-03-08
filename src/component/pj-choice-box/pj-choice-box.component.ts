import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-choice-box',
  template: ``,
  styleUrls: []
})
export abstract class PjChoiceBoxComponent implements OnInit {

  @Input()
  checked?= false;

  @Input()
  label = '';

  @Input()
  disabled?= false;


  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    if (!this.disabled){
      this.checked = !this.checked;
    }
  }

  getCompCheckedClass(): string {
    return this.disabled ? 'disabled' : (this.checked ? 'checked' : '');
  }

  hasLabel(): boolean {
    return (this.label != null && this.label.length > 0);
  }

  abstract getIconName(): string;
}
