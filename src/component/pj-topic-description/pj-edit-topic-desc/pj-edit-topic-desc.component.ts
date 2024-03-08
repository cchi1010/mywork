import { Component, Input, OnInit } from '@angular/core';
import { PjDropdownItem } from 'src/component/components.global';

@Component({
  selector: 'pj-edit-topic-desc',
  templateUrl: './pj-edit-topic-desc.component.html',
  styleUrls: ['./pj-edit-topic-desc.component.scss'],
})
export class PjEditTopicDescComponent implements OnInit {
  @Input()
  topics?: Array<string>;

  @Input()
  allowManual = false;

  private _topicForManually = 'Key in manually';

  constructor() {}

  ngOnInit(): void {
    if (this.allowManual) {
      this.topics?.push(this._topicForManually);
    }
  }

  getAllTopics(): Array<PjDropdownItem> {
    const items = new Array<PjDropdownItem>();
    this.topics?.forEach((topic) => {
      items.push({ label: topic });
    });
    return items;
  }
}
