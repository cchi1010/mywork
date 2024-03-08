import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { booleanValue, HasStringValue, PjAccordionData } from '../components.global';


@Component({ template: `` })
export class PjAccordionComponent implements OnInit {
  @Input()
  accordionData?: PjAccordionData;

  @HostBinding('class.condensed')
  private _expanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this._expanded = booleanValue(this.accordionData?.expanded);
  }

  @HostListener('click')
  onExpandedClick(): void {
    this._expanded = !this._expanded;
  }

  isExpanded(): boolean {
    return this._expanded;
  }
  onContentClick(e: MouseEvent): void {
    e.stopPropagation();
  }
  getExpandedStatusIcon(): string {
    return this._expanded ? 'expand_less' : 'expand_more';
  }

  getIconName(): string {
    return this.accordionData?.iconName || '';
  }

  getLabel(): string {

    return this.accordionData?.label || '';
  }
  hasIcon(): boolean {
    return this.accordionData?.iconName != null;
  }
  hasDescription(): boolean {
    return HasStringValue(this.accordionData?.description);
  }

  getDescription(): string {
    return this.accordionData?.description || '';
  }

  private _isTitleHover: boolean = false;
  onTitleHover(): void {
    this._isTitleHover = true;
  }

  onTitleBlur(): void {
    this._isTitleHover = false;
  }

  getHoverClass(): string {
    return this._isTitleHover ? 'titleHover' : '';
  }
}
