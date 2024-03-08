import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjContentModule } from 'src/app/layout/pj-content/pj-content.module';
import { PjFooterModule } from 'src/app/layout/pj-footer/pj-footer.module';
import { PjHeaderModule } from 'src/app/layout/pj-header/pj-header.module';
import { PjNavbarModule } from 'src/app/layout/pj-navbar/pj-navbar.module';
import { PjToolbarModule } from 'src/app/layout/pj-toolbar/pj-toolbar.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjImageManageModule } from 'src/component/pj-image-manage/pj-image-manage.module';
import { PjLoadingModule } from 'src/component/pj-loading/pj-loading.module';
import { PjModalWindowModule } from 'src/component/pj-modal-window/pj-modal-window.module';
import { environment } from 'src/environments/environment';
import { PageComingSoonComponent } from 'src/page/page-coming-soon/page-coming-soon.component';
import { PageComingSoonModule } from 'src/page/page-coming-soon/page-coming-soon.module';
import { PageError404Component } from 'src/page/page-error404/page-error404.component';
import { PageError404Module } from 'src/page/page-error404/page-error404.module';
import { PageMaintenanceComponent } from 'src/page/page-maintenance/page-maintenance.component';
import { PageMaintenanceModule } from 'src/page/page-maintenance/page-maintenance.module';
import { PagePjComponentModule } from 'src/page/page-pj-component/page-pj-component.module';
import { PageTestModule } from 'src/page/page-test/page-test.module';
import { PathName } from 'src/service/routing.service';
import { PageDocumentModule } from '../page/page-document/page-document.module';
import { AppComponent } from './app.component';



export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

const routes: Routes = [{
  path: '', canActivate: [environment.guardService], component: environment.mainPageComponent
}, {
  path: PathName.COMING_SOON, component: PageComingSoonComponent
}, {
  path: PathName.MAINTENANCE, component: PageMaintenanceComponent
}, {
  path: PathName.ERROR404, component: PageError404Component
}, {
  path: '**', component: PageError404Component
}];

@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps: [HttpClient]
      }
    }),

    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),

    PjDropdownModule,
    PjImageModule,
    PjImageManageModule,
    PjHeaderModule,
    PjFooterModule,
    PjToolbarModule,
    PjNavbarModule,
    PjContentModule,
    PjModalWindowModule,
    PjLoadingModule,

    PageError404Module,
    PageComingSoonModule,
    PageMaintenanceModule,

    PageTestModule,
    // PagePjComponentModule,
    PageDocumentModule,

    environment.projectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
