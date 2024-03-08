import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PjIconType } from '../components.global';


@Component({
  selector: 'pj-icon',
  templateUrl: './pj-icon.component.html',
  styleUrls: ['./pj-icon.component.scss'],
})
export class PjIconComponent implements OnInit, OnChanges {
  @Input()
  iconName?: string;

  private _iconType: PjIconType = 'round';
  private _iconName?: string;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const v = changes['iconName'].currentValue;
    const dotPos = v.indexOf('.') || -1;
    this._iconType = 'round';
    if (dotPos != -1) {
      this._iconName = v.substring(0, dotPos);
      const d = v.substring(dotPos + 1);
      if (d == 'outlined') {
        this._iconType = 'outlined';
      }
    } else {
      this._iconName = v;
    }
  }

  ngOnInit(): void {}

  getIconName(): string {
    return this._iconName || '';
  }

  getIconType(): string {
    return this._iconType as string;
  }
}
