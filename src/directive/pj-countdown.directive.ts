import { Directive, HostListener, Input, NgModule } from "@angular/core";
import { interval, take } from "rxjs";
import { isTrue } from "src/component/components.global";

@Directive({
  selector: '[PjCountdown]',
})
export class PjCountdownDirective {
  @Input()
  countTotal: number = 6;

  @Input()
  countLabel: string = 'Resend';

  @Input()
  intervalTime: number = 1; // 缺省为1秒

  @Input()
  restartable: boolean = true;

  @Input()
  onCountTime: boolean = false;

  private _label: string = 'Resend';
  ngOnInit(): void {
    this.onClick(true);
    if(this.onCountTime) {
      this._label = this._formatTime(this.countTotal);
    } else {
      this._label = this.countLabel;
    }
  }

  getLabel(): string {
    return this._label;
  }

  countdownFinish(): boolean {
    if(this.onCountTime) {
      return this.countTotal != 0;
    } 
    return (this._label === this.countLabel);
  }

  @HostListener('click')
  onClick(first?: boolean): void {
    if (!this.countdownFinish()) {
      return;
    }
    if (this.restartable || isTrue(first)) {
      if(this.onCountTime) {
        this._label = this._formatTime(this.countTotal);
        interval(this.intervalTime * 1000).pipe(
          take(this.countTotal)
        ).subscribe(v => {
          this._label = this._formatTime(this.countTotal - v - 1);
        })
      } else {
        this._label = this.countLabel + ' ' + this.countTotal;
        interval(this.intervalTime * 1000).pipe(
          take(this.countTotal)
        ).subscribe(v => {
          this._label = this.countLabel + ' ' + (this.countTotal - v - 1);
          if ((this.countTotal - v - 1) == 0) {
            this._label = this.countLabel;
          }
        })
      }

    }
  }

  private _formatTime(coutTime: number): string {
    const minutes = Math.floor(coutTime / 60);
    const seconds = coutTime % 60;
    const formattedMinutes = this._padZero(minutes);
    const formattedSeconds = this._padZero(seconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  private _padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}



@NgModule({
  declarations: [
    PjCountdownDirective
  ],
  imports: [
  ],
  exports: [
    PjCountdownDirective
  ]
})
export class PjCountdownDirectiveModule { }

