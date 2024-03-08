import { Component } from '@angular/core';
import { LayoutElmName } from 'src/app/app-layout.service';
import { PjLayoutComponent } from '../pj-layout.component';


@Component({
  selector: 'pj-navbar',
  templateUrl: './pj-navbar.component.html',
  styleUrls: ['./pj-navbar.component.scss']
})
export class PjNavbarComponent extends PjLayoutComponent {
  protected override elmName(): string {
    return LayoutElmName.NAVBAR;
  }
}
