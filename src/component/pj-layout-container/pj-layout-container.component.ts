import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppConfigService } from 'src/app/app.config';
import { ContentSizeBreakPoint } from 'src/app/app.constant';
import { PjContainerItemDirective } from './pj-container-item.directive';
import { PjProperty } from '../components.global';

@Component({
  selector: 'pj-layout-container',
  template: ``,
})
export class PjLayoutContainerComponent implements OnInit {
  protected _unsubscribeAll: Subject<any> = new Subject();
  protected contentBreakPoint: string = 'xs';
  private _selfWidth: number = 0;

  @Input()
  scrollSeperately: boolean = false;

  @ContentChildren(PjContainerItemDirective, { descendants: true })
  private _items?: QueryList<PjContainerItemDirective>;

  constructor(
    protected _appService: AppConfigService,
    private _self: ElementRef
  ) { }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._appService
      .timerEvent()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._onResize();
        this._items?.forEach((item) => {
          item.setElementSize(this.contentBreakPoint);
        });
      });
  }

  private _onResize(): void {
    if (this._selfWidth != this._self.nativeElement?.children[0]?.offsetWidth) {
      this._selfWidth = this._self.nativeElement.children[0].offsetWidth || 0;
      this.contentBreakPoint = this._generateBreakPoint(this._selfWidth);
    }
  }

  private _generateBreakPoint(size: number): string {
    if (size <= ContentSizeBreakPoint.xsMax) {
      return 'xs';
    }
    if (size <= ContentSizeBreakPoint.smMax) {
      return 'sm';
    }
    if (size <= ContentSizeBreakPoint.mdMax) {
      return 'md';
    }
    if (size <= ContentSizeBreakPoint.lgMax) {
      return 'lg';
    }
    if (size <= ContentSizeBreakPoint.xlMax) {
      return 'xl';
    }
    return 'xxl';
  }

  private _selfHeight = 0;
  private _selfStyle: PjProperty = { 'height': '0px' };
  getLayoutStyle(): PjProperty {
    if (!this.scrollSeperately) {
      return {};
    }
    const docHeight = document.body.offsetHeight;
    const selfTop = this._self.nativeElement.offsetTop;
    let selH = docHeight - selfTop;
    if (this._selfHeight != selH) {
      this._selfHeight = selH;
      this._selfStyle['height'] = this._selfHeight + 'px';
    }
    return this._selfStyle;
  }
}
