import { Component } from '@angular/core';
import { LayoutElmName } from 'src/app/app-layout.service';
import { PjLayoutComponent } from '../pj-layout.component';

@Component({
  selector: 'pj-header',
  templateUrl: './pj-header.component.html',
  styleUrls: ['./pj-header.component.scss']
})
export class PjHeaderComponent extends PjLayoutComponent {
  protected override elmName(): string {
    return LayoutElmName.HEADER;
  }
}