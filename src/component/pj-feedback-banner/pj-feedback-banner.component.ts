import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { APPCONSTANT } from 'src/app/app.constant';
import { PjScreenItemDirective } from 'src/directive/pj-screen-item.directive';
import { HasStringValue, PjAction, PjActionEvent, PJ_ACTION, PJ_COMPONENT_STYLE, PJ_SIZE, PjImageData, PjImageTypeConst } from '../components.global';

@Component({
  selector: 'pj-feedback-banner',
  templateUrl: './pj-feedback-banner.component.html',
  styleUrls: ['./pj-feedback-banner.component.scss']
})
export class PjFeedbackBannerComponent implements OnInit {

  @ViewChild(PjScreenItemDirective)
  private _screenItem?: PjScreenItemDirective;

  @Input()
  pjColor?: string;

  @Input()
  closable: boolean = true;

  @Input()
  autoClose: boolean = true;

  @Input()
  action?: PjAction;

  actionClick = new EventEmitter<PjActionEvent>();

  private _feedbackImageData?: PjImageData;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor() { }

  ngOnInit(): void {
    if (this.autoClose) {
      timer(APPCONSTANT.feedbackCloseDelaySecond * 1000).pipe(
        takeUntil(this._unsubscribeAll),
      ).subscribe(() => {
        this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  hasIcon(): boolean {
    if (this.action != null && HasStringValue(this.action.iconName)) {
      return true;
    }
    return false;
  }

  getIconName(): string {
    return this.action!.iconName!;
  }
  hasImage(): boolean {
    if (this.action != null && HasStringValue(this.action.imageSrc)) {
      return true;
    }
    return false;
  }

  getFeedbackImageData(): PjImageData {
    if (this._feedbackImageData == null && this.action != null && HasStringValue(this.action?.imageSrc)) {
      this._feedbackImageData = {
        imageSrc: this.action?.imageSrc,
        imageType: PjImageTypeConst.RECTANGLE,
        width: 48, height: 48,
        noMouseEffection: true,
      };
    }
    if (this._feedbackImageData != null) {
      if (this._screenItem?.getScreenSize() == PJ_SIZE.EXTRA_SMALL) {
        this._feedbackImageData.width = 40; this._feedbackImageData.height = 40;
      } else if (this._screenItem?.getScreenSize() == PJ_SIZE.SMALL || this._screenItem?.getScreenSize() == PJ_SIZE.MEDIUM) {
        this._feedbackImageData.width = 48; this._feedbackImageData.height = 48;
      } else {
        this._feedbackImageData.width = 64; this._feedbackImageData.height = 64;
      }

    }
    return this._feedbackImageData || {};
  }

  getFeedbackBannerLabel(): string {
    return this.action?.label || '';
  }

  hasDescription(): boolean {
    return HasStringValue(this.action?.description);
  }
  getFeedbackBannerDescription(): string {
    return this.action?.description || '';
  }

  hasCloseBtn(): boolean {
    return this.closable;
  }

  hasAction(): boolean {
    return (this.action != null && HasStringValue(this.action.actionLabel));
  }

  getBtnLabel(): string {
    return this.action?.actionLabel || '';
  }

  getBtnSize(): string {
    let btnSize = '';
    if (this._screenItem?.getScreenSize() == PJ_SIZE.EXTRA_SMALL) {
      btnSize = PJ_SIZE.MEDIUM;
    } else if (this._screenItem?.getScreenSize() == PJ_SIZE.SMALL || this._screenItem?.getScreenSize() == PJ_SIZE.MEDIUM) {
      btnSize = PJ_SIZE.LARGE;
    } else {
      btnSize = PJ_SIZE.EXTRA_LARGE;
    }
    return btnSize;
  }

  onCloseBtnClick(): void {
    this.actionClick.emit({ actionString: PJ_ACTION.CLOSE });
  }

  onActionBtnClick(): void {
    this.actionClick.emit({ actionString: this.action?.actionString });
  }

  getCompColor(): string {
    return this.pjColor || PJ_COMPONENT_STYLE.NEUTRAL;
  }
}
