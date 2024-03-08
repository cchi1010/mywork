import { Component, Input, OnInit } from '@angular/core';
import { PjSelectionItemComponent } from '../pj-selection-item.component';

@Component({
  selector: 'pj-selitem-image',
  templateUrl: './pj-selitem-image.component.html',
  styleUrls: ['./pj-selitem-image.component.scss'],
})
export class PjSelitemImageComponent extends PjSelectionItemComponent {
  @Input()
  imageSrc: string = '';

  getImageSrc(): string {
    return this.imageSrc;
  }
}
