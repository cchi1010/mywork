import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from 'src/app/app-layout.service';
import { environment } from 'src/environments/environment';
import { TestHeaderComponent } from './test-header/test-header.component';


@Component({
  selector: 'page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.scss']
})
export class PageTestComponent implements OnInit {
  constructor(private _layoutService: AppLayoutService) { }
  ngOnInit(): void {
    this._layoutService.attachHeaderComponent(TestHeaderComponent);
  }

  getReviewDesc(): string {
    return 'Component review: ' + environment.buildSn;
  }
}
