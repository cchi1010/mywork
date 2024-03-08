import { Component, Input, OnInit } from '@angular/core';
import { PjAction, PjImageData, PjImageTypeConst } from '../components.global';

@Component({
  selector: 'pj-action-card',
  templateUrl: './pj-action-card.component.html',
  styleUrls: ['./pj-action-card.component.scss'],
})
export class PjActionCardComponent implements OnInit {
  @Input()
  actionCardData?: PjAction;

  constructor() { }

  ngOnInit(): void { }

  getDescription(): string {
    return this.actionCardData?.description || '';
  }

  hasDescription(): boolean {
    return (
      this.actionCardData?.description != null &&
      this.actionCardData.description.length > 0
    );
  }

  getTitle(): string {
    return this.actionCardData?.label || '';
  }

  getImageData(): PjImageData {
    return {
      imageSrc: this.actionCardData?.imageSrc || '',
      imageType: PjImageTypeConst.RECTANGLE,
      width: 80, height: 80,
      noMouseEffection: true
    }
  }

  getDisabledClass(): string {
    return this.actionCardData?.disabled ? 'disabled' : '';
  }
}
