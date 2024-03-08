import { Component, HostBinding, Input } from '@angular/core';

@Component({ selector: 'pj-button', template: `` })
export abstract class PjButtonComponent {
  @Input()
  disabled = false;

  @HostBinding('style.pointer-events')
  get disabledClick(): string {
    return this.disabled ? 'none' : '';
  }
}