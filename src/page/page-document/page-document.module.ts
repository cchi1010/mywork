import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDocumentComponent } from './page-document.component';
import { Routes, RouterModule } from '@angular/router';
import { PathName } from 'src/service/routing.service';
import { PjLayoutContainerModule } from 'src/component/pj-layout-container/pj-layout-container.module';
import { PjSideMenuModule } from 'src/component/pj-side-menu/pj-side-menu.module';
import { PjDocumentSectionModule } from './pj-document-section/pj-document-section.module';



const routes: Routes = [{
  path: PathName.PJ_DOCUMENT, component: PageDocumentComponent
}, {
  path: PathName.PJ_DOCUMENT_COMPONENT, component: PageDocumentComponent
}];
@NgModule({
  declarations: [
    PageDocumentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    PjLayoutContainerModule,
    PjSideMenuModule,
    PjDocumentSectionModule
  ],
  exports: [
    PageDocumentComponent
  ]
})
export class PageDocumentModule { }
