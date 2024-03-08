import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { ContentSizeBreakPoint } from 'src/app/app.constant';
import { PjProperty } from 'src/component/components.global';

@Component({
  selector: 'page-two-columns',
  templateUrl: './page-two-columns.component.html',
  styleUrls: ['./page-two-columns.component.scss']
})
export class PageTwoColumnsComponent implements OnInit {

  @ViewChild('leftColumn')
  private _leftColumn?: ElementRef

  private _unsubscribeAll: Subject<any> = new Subject();
  private _containerWidth: number = 0;
  private _containerLeft: number = 0;
  private _documentWidth: number = 0;
  private _leftColumnWidth: number = 0;
  constructor(private _appService: AppConfigService) { }

  ngOnInit(): void {
    this._appService.timerEvent().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => this._onResize());
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    this._leftColumnWidth = this._leftColumn?.nativeElement.offsetWidth;
    this._documentWidth = document.firstElementChild?.clientWidth || 0;
    this._containerWidth = this._documentWidth - this._leftColumnWidth; 
    this._containerLeft = 0;
  }

  getContainerStyle(): PjProperty {
    return {
      'width': this._containerWidth + 'px',
      'left': this._containerLeft + 'px'
    };
  }

  private _onResize(): void {
    if (this._leftColumnWidth == this._leftColumn?.nativeElement.offsetWidth && 
      this._documentWidth == document.firstElementChild?.clientWidth) {
      return;
    }
    this._leftColumnWidth = this._leftColumn?.nativeElement.offsetWidth;
    this._documentWidth = document.firstElementChild?.clientWidth || 0;
    this._containerWidth = this._documentWidth - this._leftColumnWidth; 
    if (this._containerWidth > ContentSizeBreakPoint.maxWidth) {
      this._containerWidth = ContentSizeBreakPoint.maxWidth;
    }
    let sideWidth = Math.floor((this._documentWidth - this._containerWidth) / 2);
    if (sideWidth > this._leftColumnWidth) {
      this._containerLeft = sideWidth - this._leftColumnWidth;
    } else {
      this._containerLeft = 0;
    }
  }
}
