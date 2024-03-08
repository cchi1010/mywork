import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANT } from 'src/app/app.constant';
import { PjImageData, PjImageTypeConst, PjConfirmationData } from '../components.global';

@Component({
  selector: 'pj-confirmation',
  templateUrl: './pj-confirmation.component.html',
  styleUrls: ['./pj-confirmation.component.scss'],
})
export class PjConfirmationComponent implements OnInit {
  @Input()
  confirmationData?: PjConfirmationData;

  constructor() { }

  ngOnInit(): void { }

  getImageData(): PjImageData {
    return {
      imageSrc: this.confirmationData?.imageSrc || APPCONSTANT.emptyImage,
      width: 120, height: 120, noMouseEffection: true,
      imageType: PjImageTypeConst.RECTANGLE
    };
  }

  getTitle(): string {
    return this.confirmationData?.title || '';
  }

  getDescription(): string {
    return this.confirmationData?.description || '';
  }

  getEmail(): string {
    return this.confirmationData?.loginUserEmail || '';
  }
}
