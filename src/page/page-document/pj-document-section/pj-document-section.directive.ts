import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[DocumentSection]',
})
export class PjDocumentSectionDirective {
  constructor(private _viewContainerRef: ViewContainerRef) { }
  getViewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }
}
