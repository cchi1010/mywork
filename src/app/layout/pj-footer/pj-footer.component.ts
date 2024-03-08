import { Component } from '@angular/core';
import { LayoutElmName } from 'src/app/app-layout.service';
import { PjLayoutComponent } from '../pj-layout.component';


@Component({
  selector: 'pj-footer',
  templateUrl: './pj-footer.component.html',
  styleUrls: ['./pj-footer.component.scss']
})
export class PjFooterComponent extends PjLayoutComponent {
  protected override elmName(): string {
    return LayoutElmName.FOOTER;
  }
  isEnabled(): boolean {
    return this._layoutService.isEnabled(LayoutElmName.FOOTER);
  }
}
