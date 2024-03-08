import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { ArrayIsNotEmpty, PjProgressStepData } from 'src/component/components.global';

@Component({
  selector: 'pj-progress-status',
  templateUrl: './pj-progress-status.component.html',
  styleUrls: ['./pj-progress-status.component.scss']
})
export class PjProgressStatusComponent implements OnInit {

  private _currentStepElm?: HTMLDivElement;
  private _currentWidth = 10;

  @Input()
  steps?: Array<PjProgressStepData>;

  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(private _appCfgService: AppConfigService) { }
  ngOnInit(): void {
    this._appCfgService.timerEvent().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      if (this._currentStepElm == null) {
        return;
      }
      let lastStep: boolean = false;
      if (ArrayIsNotEmpty(this.steps)) {
        lastStep = (this.steps![this.steps?.length! - 1].status == 'current');
      }
      const rect = this._currentStepElm.getBoundingClientRect();
      const pRect = this._currentStepElm.parentElement?.getBoundingClientRect();
      if (rect != null && pRect != null) {
        if(lastStep) {
          this._currentWidth = rect.x - pRect?.x + rect.width;
        } else {
          this._currentWidth = rect.x - pRect?.x + rect.width / 2;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getLabelCurrentClass(step: PjProgressStepData, elm?: HTMLDivElement): string {
    if (step.status == 'current') {
      if (elm != null && this._currentStepElm != elm) {
        this._currentStepElm = elm;
      }
      return 'current';
    }
    return '';
  }

  getProgressBarWidthStyle(): {} {
    return { 'width': this._currentWidth + 'px' };
  }
}
