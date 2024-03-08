import { ApplicationRef, ComponentRef, Injectable, Type, createComponent } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ComponentService {
  constructor(private _appRef: ApplicationRef) { }

  attachView(component: Type<any>, componentInputData?: any, outerElement?: HTMLElement): ComponentRef<any> {
    const componentRef = createComponent(component, { environmentInjector: this._appRef.injector });
    if (componentInputData) {
      Object.keys(componentInputData).forEach((key) => {
        componentRef.instance[key] = componentInputData[key];
      });
    }
    componentRef.changeDetectorRef.detectChanges();
    this._appRef.attachView(componentRef.hostView);
    this._appendToPage(componentRef.location.nativeElement, outerElement);
    return componentRef;
  }

  detachView(componentRef?: ComponentRef<any>) {
    if (componentRef != null) {
      componentRef.destroy();
      this._appRef.detachView(componentRef.hostView);
    }
  }

  private _appendToPage(innerElement: HTMLElement, outerElement?: HTMLElement) {
    if (outerElement) {
      outerElement.appendChild(innerElement);
    } else {
      //如果不指定组件的挂靠的锚点，就直接放到body下即可。
      document.body.appendChild(innerElement);
    }
  }
}