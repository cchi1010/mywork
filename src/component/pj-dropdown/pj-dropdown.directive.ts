import { Directive, ElementRef, HostListener, Injectable, Input, OnInit, SimpleChanges } from '@angular/core';
import { PjDropdownBoxComponent } from './pj-dropdown-box/pj-dropdown-box.component';
import { PjDropdownComponent } from './pj-dropdown/pj-dropdown.component';

@Directive({
  selector: '[dropdownElm]',
})
export class PjDropdownDirective implements OnInit {

  @Input()
  dropdownElm?: PjDropdownComponent | PjDropdownBoxComponent;

  @Input()
  positionType: string = 'relative';

  constructor(private service: PjDropdownService, private _elm: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dropdownElm'].firstChange && this.dropdownElm != null) {
      this.service.registerDropdown(this.dropdownElm);
    }
  }

  ngOnInit(): void {
    if (this.dropdownElm != null) {
      this._elm.nativeElement.parentElement.classList.add(this.positionType);
      this.dropdownElm.openedBy = this._elm.nativeElement.parentElement;
    }
  }

  @HostListener('click', ['$event'])
  onMouseClick(mouseEvent: Event) {
    for (let attr of this._elm.nativeElement.attributes) {
      if (attr.name.endsWith('disabled') && attr.value == 'true') {
        return;
      }
    }
    mouseEvent.stopPropagation();
    const o = this.dropdownElm?.opened.value;
    this.service.closeAllDropdown();
    if (this.dropdownElm != null) {
      if (!o) {
        this.dropdownElm.opened.next(!o);
      }
    }
  }
}

@Injectable({ providedIn: 'root' })
class PjDropdownService {
  private _registeredDropdown = new Array<PjDropdownComponent | PjDropdownBoxComponent>();
  registerDropdown(elm: PjDropdownComponent | PjDropdownBoxComponent): void {
    if (elm != null) {
      this._registeredDropdown.push(elm);
    }
  }

  closeAllDropdown(): void {
    this._registeredDropdown.filter(v => v.opened.value).forEach(elm => elm.opened.next(false));
  }
}
