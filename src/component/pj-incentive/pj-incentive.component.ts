import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'pj-incentive',
  templateUrl: './pj-incentive.component.html',
  styleUrls: ['./pj-incentive.component.scss']
})
export class PjIncentiveComponent implements OnInit {

  @Input()
  label?= '';

  @Input()
  iconName?= '';

  constructor() { }

  ngOnInit(): void {
  }

  hasIcon(): boolean {
    return (this.iconName != null && this.iconName.length > 0);
  }

}
