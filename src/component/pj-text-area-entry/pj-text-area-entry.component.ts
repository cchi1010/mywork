import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { HasStringValue, PjProperty } from '../components.global';

@Component({
  selector: 'pj-text-area-entry',
  templateUrl: './pj-text-area-entry.component.html',
  styleUrls: ['./pj-text-area-entry.component.scss'],
})
export class PjTextAreaEntryComponent implements OnInit {
  @Input()
  maxLength?: number = 200;

  @Input()
  label?: string;

  @Input()
  error?: boolean = false;

  @Input()
  disabled?: boolean = false;

  @Input()
  height?: number = 200;

  @Input()
  defaultValue: string = '';

  @Input()
  refreshEmpty?: boolean;
  @Input()
  focused = false;

  @Input()
  placeholder: string = '';

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  lostFocus = new EventEmitter<void>();
  inputContent = new UntypedFormControl('');

  @Output()
  onFocusInput = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
    this.inputContent.setValue(this.defaultValue || '')
    this.inputContent.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      // this._valueChanged = true;
      this.valueChange.emit(value);
      if (this.refreshEmpty && (value.includes('\n')||value.includes(','))) {
        this.inputContent.setValue('');
      }
    });
  }



  getCharLeft(): string {
    return (this.maxLength || 0) - this.inputContent.value.length + ' left';
  }

  
  getInputAreaClass(): string {
    if (this.disabled) {
      return 'disabled';
    }
    if (this.error) {
      return 'error';
    }
    return this.focused ? 'focused' : '';
  }

  onFocus(): void {
    this.focused = true;
    this.onFocusInput.emit();
  }

  onUnfocus(): void {
    this.focused = false;
    this.lostFocus.emit();
  }
  getTextAreaStyle(): PjProperty {
    return { height: this.height + 'px' };
  }

  hasLabel(elm?: HTMLTextAreaElement): boolean {
    return HasStringValue(this.label);
  }

  getTextClass(): string {
    let c = '';
    if (this.inputContent.value.length > 0) {
      c = c + ' filled';
    }
    if (this.disabled) {
      c = c + ' disabled';
    }
    if (this.error) {
      c = c + ' error';
    }
    return c;
  }

  getLabel(): string {
    return this.label || '';
  }
}
