import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PathName } from 'src/service/routing.service';

import { PageTestComponent } from './page-test.component';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PjTabGroupModule } from 'src/component/pj-tab-group/pj-tab-group.module';
import { PjImageManageModule } from 'src/component/pj-image-manage/pj-image-manage.module';
import { TestHeaderComponent } from './test-header/test-header.component';


const routes: Routes = [{
  path: PathName.TEST, component: PageTestComponent
}, {
  path: PathName.TEST_COMPONENT, component: PageTestComponent
}];
@NgModule({
  declarations: [
    PageTestComponent,
    TestHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    PjDirectiveModule,

    PjButtonModule,

    PjTabGroupModule,

    PjImageManageModule,

  ],
  exports: [
    PageTestComponent
  ]
})
export class PageTestModule { }
