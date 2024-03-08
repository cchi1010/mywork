import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { PjSelectionItemDirective } from './pj-selection-item.directive';

@Component({
  selector: 'pj-selection-group',
  templateUrl: './pj-selection-group.component.html',
  styleUrls: ['./pj-selection-group.component.scss'],
})
export class PjSelectionGroupComponent implements OnInit {
  @Input()
  singleSelection: boolean = true;

  @Input()
  bordered: boolean = true;

  @ContentChildren(PjSelectionItemDirective, { descendants: true })
  private _selItems?: QueryList<PjSelectionItemDirective>;

  private _selItemsClickEvent: Observable<ElementRef> = new Observable<ElementRef>();

  constructor() { }

  ngOnInit(): void { }
  ngAfterContentInit(): void {
    this._selItems?.forEach((item) => {
      if(this.bordered) {
        item.getEelement().nativeElement.children[0].classList.add('pj-selection-item');
        item.getEelement().nativeElement.children[0].classList.add('withBorder');
      } else {
        item.getEelement().nativeElement.children[0].classList.add('pj-selection-item');
      }
      if(item.itemSelected) {
        item.getEelement().nativeElement.children[0].classList.add('focused');
      }
      this._selItemsClickEvent = merge(this._selItemsClickEvent, item.clicked);
    });
    this._selItemsClickEvent.subscribe((clickedItem) => {
      if (this.singleSelection) {
        this._selItems?.forEach((item) => {
          item.getEelement().nativeElement.children[0].classList.remove('focused');
        });
        clickedItem.nativeElement.children[0].classList.add('focused');
      } else {
        if (clickedItem.nativeElement.children[0].classList.contains('focused')) {
          clickedItem.nativeElement.children[0].classList.remove('focused');
        } else {
          clickedItem.nativeElement.children[0].classList.add('focused');
        }
      }
    });
  }
}
