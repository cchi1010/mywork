import { Component, Input, OnInit } from '@angular/core';
import { PjSelectionItemComponent } from '../pj-selection-item.component';

@Component({
  selector: 'pj-selitem-card',
  templateUrl: './pj-selitem-card.component.html',
  styleUrls: ['./pj-selitem-card.component.scss'],
})
export class PjSelitemCardComponent extends PjSelectionItemComponent {
  @Input()
  imageSrc: string = '';

  getImageSrc(): string {
    return this.imageSrc;
  }
}
