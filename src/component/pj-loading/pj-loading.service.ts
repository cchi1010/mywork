import { ComponentRef, Injectable } from '@angular/core';
import { ComponentService } from 'src/service/component.service';
import { PjLoadingComponent } from './pj-loading.component';

export interface PjLoagingConfig {
  title: string;
  iconName: string;
  imageSrc: string;
  isShow: boolean;
  direction: string;
  pjColor: string;
  delay: number;
}
@Injectable()
export class PjLoadingService {

  private loadingRef?: ComponentRef<PjLoadingComponent>;

  constructor(private _compService: ComponentService) { }

  showLoading(option?: Partial<PjLoagingConfig>): void {
    if (this.loadingRef != null) {
      this.loadingRef.instance.isShow = true;
      document.body.style.overflowY = 'hidden';
      return;
    }
    if (option == null) {
      option = {};
    }
    option.isShow = true;
    this.loadingRef = this._compService.attachView(PjLoadingComponent, option);
  }
  hideLoading() {
    if (this.loadingRef != null) {
      this.loadingRef.instance.isShow = false;
      document.body.style.overflowY = '';
      // this._compService.detachView(this.loadingRef);
    }
  }
}


