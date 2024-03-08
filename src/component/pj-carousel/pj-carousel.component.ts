import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { PjArrowGroupData, PjProperty, PJ_BTN_TYPE, PJ_SIZE } from '../components.global';
import { PjSwiperItemDirective } from './pj-carousel.directive';


SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'pj-carousel',
  templateUrl: './pj-carousel.component.html',
  styleUrls: ['./pj-carousel.component.scss'],
})
export class PjCarouselComponent implements OnInit, AfterContentInit {
  @ContentChildren(PjSwiperItemDirective)
  swiperItems?: QueryList<PjSwiperItemDirective>;

  @ViewChild('swiperElm')
  swiperElm?: SwiperComponent;

  @Input()
  autoplay: boolean = false;

  @Input()
  loop: boolean = false;

  @Input()
  spaceBetweenItem: number = 16;

  @Input()
  arrowGroupData: PjArrowGroupData = { btnSize: 'lg', btnType: 'elevated' };

  @Input()
  withMask: boolean = true;

  @Output()
  arrowBtnClick = new EventEmitter<string>();

  constructor(private _self: ElementRef) { }
  ngAfterContentInit(): void {

  }

  hasArrowGroup(): boolean {
    if (this.loop) {
      return (this.swiperItems?.length || 0) > 0;
    }
    return false;
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.arrowGroupData.forwardDisabled = false;
    if (!this.loop){
      this.arrowGroupData.backwardDisabled = true;
    }else{
      this.arrowGroupData.backwardDisabled = false;
    }
  }

  onForwardBtnClick(swiper: SwiperComponent): void {
    this.arrowBtnClick.emit('forward');
    swiper.swiperRef.slidePrev(100);
    if(!this.loop) {
      this._setButtonStatus(swiper);
    }
    if (this.autoplay) {
      swiper.swiperRef.autoplay.start();
    }
  }

  onBackwardBtnClick(swiper: SwiperComponent): void {
    this.arrowBtnClick.emit('backward');
    swiper.swiperRef.slideNext(100);
    if(!this.loop) {
      this._setButtonStatus(swiper);
    }
    if (this.autoplay) {
      swiper.swiperRef.autoplay.start();
    }
  }

  private _setButtonStatus(swiper: SwiperComponent): void {
    this.arrowGroupData.forwardDisabled = false;
    this.arrowGroupData.backwardDisabled = false;
    if (swiper.swiperRef.isBeginning == true) {
      this.arrowGroupData.backwardDisabled = true;
    }
    if (swiper.swiperRef.isEnd == true) {
      this.arrowGroupData.forwardDisabled = true;
    }
  }

  getPositionStyle(): PjProperty {
    if (this.arrowGroupData.btnSize == PJ_SIZE.EXTRA_LARGE) {
      return { top: 'calc(50% - 24px)' };
    }
    return { top: 'calc(50% - 20px)' };
  }

  getBtnType(): string {
    return this.arrowGroupData?.btnType || PJ_BTN_TYPE.TEXT;
  }

  getBtnSize(): string {
    return this.arrowGroupData?.btnSize || PJ_SIZE.LARGE;
  }
  isForwardDisabled(): boolean {
    return this.arrowGroupData.forwardDisabled!;
  }
  isBackwardDisabled(): boolean {
    return this.arrowGroupData.backwardDisabled!;
  }
  getBackBtnVisible(): string {
    return this.isBackwardDisabled() ? 'invisible' : 'visible'
  }
  getForwardBtnVisible(): string {
    return this.isForwardDisabled() ? 'invisible' : 'visible'
  }
}
