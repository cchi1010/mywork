import { Component, Input, OnInit } from '@angular/core';
import { PJ_COMPONENT_STYLE, PJ_SIZE } from '../components.global';

@Component({
  selector: 'pj-badge',
  templateUrl: './pj-badge.component.html',
  styleUrls: ['./pj-badge.component.scss'],
})
export class PjBadgeComponent implements OnInit {
  @Input()
  label = '';

  @Input()
  withDot = false;

  constructor() {}

  ngOnInit(): void {}

  hasDot(): boolean {
    return this.withDot;
  }
}
