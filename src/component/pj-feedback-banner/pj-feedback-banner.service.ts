import { ComponentRef, Injectable } from "@angular/core";
import { Subject, timer } from "rxjs";
import { AppConfigService } from "src/app/app.config";

import { ComponentService } from 'src/service/component.service';
import { PjProperty, PJ_ACTION, PJ_COMPONENT_STYLE } from "../components.global";

import { PjFeedbackBannerComponent } from "./pj-feedback-banner.component";


@Injectable()
export class PjFeedbackBannerService {

  protected _unsubscribeAll: Subject<any> = new Subject<any>();

  private _feedbackBannerRef?: ComponentRef<PjFeedbackBannerComponent>;

  constructor(private _compService: ComponentService, private _appCfgService: AppConfigService) { }

  private _iconNames: PjProperty = {
    neutral: 'favorite',
    info: 'info',
    success: 'check_circle',
    error: 'error_outline',
  };

  infoFeedback(label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._showStyleFeedback(PJ_COMPONENT_STYLE.INFO, label, description, closable, autoClose, actionLabel, actionHandler);
  }

  neutralFeedback(label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._showStyleFeedback(PJ_COMPONENT_STYLE.NEUTRAL, label, description, closable, autoClose, actionLabel, actionHandler);
  }

  successFeedback(label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._showStyleFeedback(PJ_COMPONENT_STYLE.SUCCESS, label, description, closable, autoClose, actionLabel, actionHandler);
  }

  errorFeedback(label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._showStyleFeedback(PJ_COMPONENT_STYLE.ERROR, label, description, closable, autoClose, actionLabel, actionHandler);
  }

  imageFeedback(imageSrc: string, label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._show({
      closable: (closable != null ? closable : false),
      autoClose: autoClose != null ? autoClose : (closable != null ? !closable : true),
      action: {
        imageSrc: imageSrc,
        label: label,
        actionLabel: actionLabel,
        actionString: (actionHandler == null) ? PJ_ACTION.CLOSE : '',
        description: description,
      },
    }, actionHandler);
  }

  private _showStyleFeedback(type: string, label: string, description?: string, closable?: boolean, autoClose?: boolean, actionLabel?: string, actionHandler?: Function): void {
    this._show({
      closable: (closable != null ? closable : false),
      autoClose: autoClose != null ? autoClose : (closable != null ? !closable : true),
      pjColor: type,
      action: {
        iconName: this._iconNames[type],
        label: label,
        actionLabel: actionLabel,
        actionString: (actionHandler == null) ? PJ_ACTION.CLOSE : '',
        description: description,
      },
    }, actionHandler);
  }

  private _locked: boolean = false;
  private _show(data: any, actionHandler?: Function): void {
    if (this._locked) {
      return;
    }
    this._locked = true;
    let t = 50;
    if (this._feedbackBannerRef != null) {
      this._compService.detachView(this._feedbackBannerRef);
      this._feedbackBannerRef = undefined;
      t = 250;
    }
    timer(t).subscribe(() => {
      this._feedbackBannerRef = this._compService.attachView(PjFeedbackBannerComponent, data);
      this._feedbackBannerRef.instance.actionClick.subscribe(actionEvent => {
        if (actionEvent.actionString !== PJ_ACTION.CLOSE && actionHandler != null) {
          actionHandler(actionEvent);
        }
        this._compService.detachView(this._feedbackBannerRef);
        this._feedbackBannerRef = undefined;
      });
      this._locked = false;
    });
  }
}
