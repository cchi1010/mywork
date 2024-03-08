import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pj-link-generic',
  templateUrl: './pj-link-generic.component.html',
  styleUrls: ['./pj-link-generic.component.scss'],
})
export class PjLinkGenericComponent implements OnInit {

  @Input()
  linkType: 'body' | 'label' | 'strong' = 'body';
  constructor() { }

  ngOnInit(): void { }

  getLinkClass(): string {
    return this.linkType;
  }
}
