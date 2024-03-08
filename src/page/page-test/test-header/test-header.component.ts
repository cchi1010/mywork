import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoutingService } from 'src/service/routing.service';

@Component({
  selector: 'test-header',
  templateUrl: './test-header.component.html',
  styleUrls: ['./test-header.component.scss']
})
export class TestHeaderComponent implements OnInit {

  constructor(private _routingService: RoutingService) { }

  onHomeBtnClick(): void {
    this._routingService.gotoHomePage();
  }
  onComponentBtnClick(): void {
    this._routingService.gotoPJComponentLink('accordion');
  }

  hasProjectTestPage(): boolean {
    return (environment.projectComponentTest != null);
  }

  getProjectBtnLabel(): string {
    if (environment.projectComponentTest == null) {
      return '';
    }
    return (environment.projectComponentTest['btnLabel'] || '');
  }

  onProjectComponentBtnClick(): void {
    if (environment.projectComponentTest == null || environment.projectComponentTest['path'] == null) {
      return;
    }
    this._routingService.gotoUrl(environment.projectComponentTest['path']);
  }
  ngOnInit(): void {
  }

}
