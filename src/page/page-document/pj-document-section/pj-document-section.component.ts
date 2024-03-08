import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArrayIsEmpty, ArrayIsNotEmpty, HasStringValue, isTrue, PjProperty, PjFieldValue } from 'src/component/components.global';
import { PjDocumentSectionDirective } from './pj-document-section.directive';
import { PjDocumentSectionData, PjComponentData } from './pj-document-section.type';

@Component({
  selector: 'pj-document-section',
  templateUrl: './pj-document-section.component.html',
  styleUrls: ['./pj-document-section.component.scss']
})
export class PjDocumentSectionComponent implements OnInit {

  @ViewChild(PjDocumentSectionDirective, { static: true })
  private _documentExample!: PjDocumentSectionDirective;

  @Input()
  docSectionData?: PjDocumentSectionData;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this._documentExample == null) {
      return;
    }
    if (ArrayIsEmpty(this.docSectionData?.components)) {
      return;
    }
    const vcRef = this._documentExample.getViewContainerRef();
    vcRef.clear();
    this.docSectionData?.components?.forEach(component => this._createComponent(vcRef, component));
  }

  getCompArrangementClass(): string {
    if (this.docSectionData?.arrangementType === 'row') {
      return 'flex flex-row gap-2';
    }
    return 'flex flex-col gap-2';
  }

  getBackgroundColor(): PjProperty {
    if (this.docSectionData?.backgoundColor != null) {
      return { 'border-radius': '16px', 'background-color': this.docSectionData?.backgoundColor };
    }
    return {};
  }
  hasTitle(): boolean {
    return HasStringValue(this.docSectionData?.title);
  }
  getTitleClass(): string {
    return this.docSectionData?.titleSize || '';
  }
  getTitle(): string {
    return this.docSectionData?.title || '';
  }

  hasDescription(): boolean {
    return HasStringValue(this.docSectionData?.description);
  }
  getDescClass(): string {
    return '';
  }
  getDescription(): string {
    return this.docSectionData?.description || '';
  }
  hasParameters(): boolean {
    return ArrayIsNotEmpty(this.docSectionData?.parameters);
  }
  getParameters(): Array<PjFieldValue> {
    return this.docSectionData?.parameters || [];
  }

  private _createComponent(vcRef: ViewContainerRef, compData: PjComponentData): void {
    if (compData.componentType == null || compData.componentData == null) {
      return;
    }
    let componentRef: ComponentRef<any>;
    if (isTrue(compData.hasContent)) {
      let divNode = document.createElement('div');
      let text = document.createTextNode('This is content for the component. will inject into <ng-content></ng-content>');
      divNode.appendChild(text);
      componentRef = vcRef.createComponent(compData.componentType, { projectableNodes: [[divNode]] });
    } else {
      componentRef = vcRef.createComponent(compData.componentType);
    }
    if (componentRef == null) {
      return;
    }
    compData.directives?.forEach(directive => {
      if (directive.directiveType != null) {
        let d = new directive.directiveType(componentRef.location);
        if (directive.directiveData != null) {
          for (let f in directive.directiveData) {
            d[f] = directive.directiveData[f];
          }
        }
        d.ngOnInit();
      }
    });
    for (let field in compData.componentData) {
      componentRef.instance[field] = compData.componentData[field];
    }
    componentRef.instance.ngOnInit();
  }
}
