import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PjProperty } from 'src/component/components.global';

@Component({
  selector: 'pj-dropdown-box',
  templateUrl: './pj-dropdown-box.component.html',
  styleUrls: ['./pj-dropdown-box.component.scss'],
})
export class PjDropdownBoxComponent implements OnInit {
  @Input()
  openable?: boolean;

  opened = new BehaviorSubject<boolean>(false);

  openedBy?: HTMLDivElement;

  @Input()
  hasPadding: boolean = true;

  @Input()
  hasBorder: boolean = true;

  @Input()
  horizontalAlign?: 'right' | 'left';

  @Input()
  maxHeight?: number;

  private _firstDivElm?: HTMLDivElement;

  constructor(private _elm: ElementRef) { }

  ngOnInit(): void {
    this.opened.pipe().subscribe(v => {
    });
  }

  isOpened(): boolean {
    this._firstDivElm = this._elm.nativeElement.children[0];
    let o = false;
    if (this.openable != null) {
      o = this.openable;
    } else {
      o = this.opened.value;
    }
    if (o && this.openedBy != null && this._firstDivElm != null) {
      if (this.hasPadding) {
        this._firstDivElm.classList.add('padding');
      }
      if (this.hasBorder) {
        this._firstDivElm.classList.add('border');
      }
      const parentNodeLeft = this.openedBy.offsetLeft;
      if (this.horizontalAlign == null) {
        if (
          parentNodeLeft + this._firstDivElm.offsetWidth + 100 >
          (document.firstElementChild?.clientWidth || 0)
        ) {
          this._firstDivElm.classList.add('right');
        } else {
          this._firstDivElm.classList.add('left');
        }
      } else {
        this._firstDivElm.classList.add(this.horizontalAlign);
      }
    }
    return o;
  }

  getTop(): PjProperty {
    if(this.maxHeight != undefined) {
      return {};
    } 
    return {
      top: (this.openedBy?.offsetHeight || 0) + 'px'
    };
  }

  getMaxHeight(): PjProperty {
    if(this.maxHeight != undefined) {
      return {
        'max-height': this.maxHeight + 'px',
        'overflow-y': 'scroll',
      };
    } 
    return {
      'max-height': 'calc( 100vh - ' + this._getMaxHeight() + 'px',
    };
  }

  private _getMaxHeight(): number {
    let actualTop: number = this.openedBy?.offsetTop || 0;
    var current: any = this.openedBy?.offsetParent;

    while (current != null) {
      actualTop += (current.offsetTop - current.scrollTop);
      current = current.offsetParent;
    }
    return (this.openedBy?.offsetHeight || 0) + (actualTop - window.scrollY) + 32;
  }

}
