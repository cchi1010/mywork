import { Component, ComponentRef, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HasStringValue } from '../components.global';
import { PjModalWindowService } from './pj-modal-window.service';

@Component({
  selector: 'pj-modal-window',
  templateUrl: './pj-modal-window.component.html',
  styleUrls: ['./pj-modal-window.component.scss'],
})
export class PjModalWindowComponent implements OnInit {
  @ViewChild('modalTitle', { static: false })
  private _winTitle?: ElementRef;

  @ViewChild('content')
  private _content?: ElementRef;

  @Input()
  closeOnBgClick: boolean = true;

  @Input()
  title = '';

  @Input()
  closeable = false;

  @Input()
  pjSize?: string;

  private _show = true;

  constructor(private _modalWinService: PjModalWindowService) { }

  getTitleClass(): string {
    if (this._winTitle != null) {
      if (this.title.trim().length > 0) {
        this._winTitle?.nativeElement.classList.add('justify-between');
      } else {
        this._winTitle?.nativeElement.classList.add('justify-end');
      }
    }
    return '';
  }

  getSizeClass(): string {
    return this.pjSize || 'sm';
  }

  getContent(): Observable<ElementRef | undefined> {
    return of(this._content);
  }

  getCloseBtnSize(): string {
    return this.pjSize == 'sm' ? 'md' : 'lg';
  }

  ngOnInit(): void { }

  onBgCloseClick(): void {
    if (this.closeOnBgClick) {
      this.onCloseClick();
    }
  }
  onCloseClick(): void {
    this._show = false;
    this._modalWinService.closeModalWin();
  }

  open(): void {
    this._show = true;
  }

  close(): void {
    this._show = false;
  }

  isOpened(): boolean {
    return this._show;
  }

  donothing(event: Event): void {
    event.stopPropagation();
  }

  hasTitle(): boolean {
    return HasStringValue(this.title);
  }
}
