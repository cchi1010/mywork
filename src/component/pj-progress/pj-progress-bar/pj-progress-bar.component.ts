import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PjProperty } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-bar',
  templateUrl: './pj-progress-bar.component.html',
  styleUrls: ['./pj-progress-bar.component.scss']
})
export class PjProgressBarComponent implements OnInit {

  @Input()
  progress = 20;

  private _progressStyle = { 'width': '' };
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
      this._progressStyle = { 'width': this.progress + '%' };
  }

  getProgressStyle(): PjProperty {
    return this._progressStyle;
  }
}
