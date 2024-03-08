import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HasStringValue, PjActionEvent, PJ_ACTION, PjImageData, PjImageTypeConst, PjRemoveData } from 'src/component/components.global';
import { PjModalWindowService } from '../pj-modal-window.service';

@Component({
  selector: 'pj-dlg-remove',
  templateUrl: './pj-dlg-remove.component.html',
  styleUrls: ['./pj-dlg-remove.component.scss'],
})
export class PjDlgRemoveComponent implements OnInit {
  @Input()
  removeData?: PjRemoveData;



  @Output()
  actionClick = new EventEmitter<PjActionEvent>();

  @ViewChild('content')
  private _content?: ElementRef;

  constructor(private _modalWinService: PjModalWindowService) { }

  ngOnInit(): void { }

  getContent(): Observable<ElementRef | undefined> {
    return of(this._content);
  }

  hasImage(): boolean {
    return HasStringValue(this.removeData?.imageSrc);
  }

  hasContent(): boolean {
    return this._content != null;
  }
  getImageData(): PjImageData {
    return {
      imageSrc: this.removeData?.imageSrc,
      width: this.removeData?.imageWidth || 80,
      height: this.removeData?.imageHeight || 80,
      imageType: PjImageTypeConst.CIRCLE,
      noMouseEffection: true
    }
  }
  getContentAlign(): string {
    return (this.removeData?.contentAlign || 'self-stretch');
  }

  onCancleBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
  }

  onRemoveBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.REMOVE });
  }

  onCloseClick(): void {
    this._modalWinService.closeModalWin();
  }

}
