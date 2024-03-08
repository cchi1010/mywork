import { Component, Input, OnInit } from '@angular/core';
import { PjAction } from '../components.global';

@Component({
  selector: 'pj-info-card',
  templateUrl: './pj-info-card.component.html',
  styleUrls: ['./pj-info-card.component.scss'],
})
export class PjInfoCardComponent implements OnInit {
  @Input()
  label?: string;

  @Input()
  value?: any;

  @Input()
  iconName?: string;

  @Input()
  action?: PjAction;

  constructor() {}

  ngOnInit(): void {}
}
