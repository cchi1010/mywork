import { Component, Input, OnInit } from '@angular/core';
import { PJ_SIZE, PjImageData, PjImageTypeConst } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-indicator',
  templateUrl: './pj-progress-indicator.component.html',
  styleUrls: ['./pj-progress-indicator.component.scss']
})
export class PjProgressIndicatorComponent implements OnInit {

  @Input()
  logoImageSrc: string = 'assets/image/logo/logo.png';

  @Input()
  pjSize: string = PJ_SIZE.MEDIUM;

  private _logoImageData?: PjImageData;

  constructor() { }

  ngOnInit(): void {
    this._logoImageData = {
      imageSrc: this.logoImageSrc,
      imageType: PjImageTypeConst.RECTANGLE,
      noMouseEffection: true,
    }
  }


  getLogoImageData(): PjImageData {
    if(this.pjSize === PJ_SIZE.SMALL) {
      this._logoImageData!.width = 20;
      this._logoImageData!.height = 20;
    } else if(this.pjSize === PJ_SIZE.MEDIUM) {
      this._logoImageData!.width = 40;
      this._logoImageData!.height = 40;
    } else {
      this._logoImageData!.width = 64;
      this._logoImageData!.height = 64;
    }
    return this._logoImageData || {};
  }

}
