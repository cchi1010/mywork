import { Component } from '@angular/core';
import { LayoutElmName } from 'src/app/app-layout.service';

import { PjLayoutComponent } from '../pj-layout.component';
@Component({
  selector: 'pj-toolbar',
  templateUrl: './pj-toolbar.component.html',
  styleUrls: ['./pj-toolbar.component.scss']
})
export class PjToolbarComponent extends PjLayoutComponent {

  protected override elmName(): string {
    return LayoutElmName.TOOLBAR;
  }
}
