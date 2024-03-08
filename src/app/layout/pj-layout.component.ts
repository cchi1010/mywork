import { Component, ElementRef } from '@angular/core';
import { AppLayoutService } from '../app-layout.service';

@Component({ template: `` })
export abstract class PjLayoutComponent {

  protected abstract elmName(): string;

  private _opened: boolean;

  constructor(protected _layoutService: AppLayoutService, private _self: ElementRef) {
    this._opened = this._layoutService.isOpened(this.elmName());
  }

  ngOnInit(): void {
    if (this._self.nativeElement.tagName.startsWith('PJ-')) {
      this._layoutService.setLayoutElmRef(this.elmName(), this._self);
    }
    this._layoutService.layoutElmOpened().subscribe(opened => {
      this._opened = opened[this.elmName()];
    });
  }

  isOpened(): boolean {
    return this._opened;
  }
}