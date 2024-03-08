import { Directive, EventEmitter, HostListener, Input, NgModule, Output } from "@angular/core";
import { Subject, Subscription, throttleTime } from "rxjs";
import { RestfulService } from "src/service/restful.service";

@Directive({ selector: '[one-click]'})
export class PjOneCLickDirective {

  @Output('one-click')
  oneClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Input()
  interval: number = 2000;

  @Input()
  waitForHttpDone: boolean = false;

  private _internalEvent$ = new Subject<MouseEvent>();
  private _subscription?: Subscription;
  private _httpSubscription?: Subscription;
  private _httpBegin = false;
  private _throttleIntervalTime = 0;
  constructor(private _httpService: RestfulService) {

  }
  ngOnInit(): void {
    this._httpSubscription = this._httpService.httpProcessing(
    ).subscribe(done => {
      if(this._httpBegin && done) {
        this._httpBegin = false;
      }
    });
    if(this.waitForHttpDone) {
      this._throttleIntervalTime = 0;
    } else {
      this._throttleIntervalTime = this.interval;
    }
    this._subscription = this._internalEvent$.pipe(
      throttleTime(this._throttleIntervalTime)
    ).subscribe(e => {
      this.oneClick.emit(e);
      this._httpBegin = true;
    });
  }
  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
    this._httpSubscription?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if(this.waitForHttpDone) {
      if(!this._httpBegin) {
        this._internalEvent$.next(event);
      }
    } else {
      this._internalEvent$.next(event);
    }
  }
}

@NgModule({
  declarations: [ PjOneCLickDirective ],
  exports: [ PjOneCLickDirective ]
})
export class PjOneCLickDirectiveModule { }