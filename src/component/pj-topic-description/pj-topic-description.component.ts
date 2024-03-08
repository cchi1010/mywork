import { Component, Input, OnInit } from '@angular/core';
import { HasStringValue } from '../components.global';

@Component({
  selector: 'pj-topic-description',
  templateUrl: './pj-topic-description.component.html',
  styleUrls: ['./pj-topic-description.component.scss']
})
export class PjTopicDescriptionComponent implements OnInit {

  @Input()
  level: 'sm' | 'lg' = 'sm';

  @Input()
  title?: string;

  constructor() { }

  ngOnInit(): void {
  }

  hasTitle(): boolean {
    return HasStringValue(this.title);
  }
  getTitle(): string {
    return this.title || '';
  }
  getCompClass(): string {
    return (this.level == 'sm') ? 'gap-1 sm' : 'gap-6 lg';
  }
}
