import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PjProperty } from '../components.global';

@Component({
  selector: 'pj-search-result',
  templateUrl: './pj-search-result.component.html',
  styleUrls: ['./pj-search-result.component.scss']
})
export class PjSearchResultComponent implements OnInit {

  @Input()
  title?: string;

  @Input()
  description?: string;

  @Input()
  keyword?: string;

  constructor(private _self: ElementRef) { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return this.title || '';
  }

  getDescription(): string {
    return this.description || '';
  }

  getWithStyle(): PjProperty {
    let width = this._self.nativeElement.offsetWidth;
    // if(width !== this._selfWidth) {
    //   this._selfWidth 
    // }
    let greaterThanSizeSM = this._self.nativeElement.firstChild.classList.contains('sm');
    return { 'max-width': (width - 16 - (greaterThanSizeSM ? (16*2 + 24) : (12*2 + 18))) + 'px' }
  }
}
