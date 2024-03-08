import { PolarJGuard } from 'src/app/polarj.guard';
import { PolarJModule } from 'src/app/polarj.module';
import { PjProperty } from 'src/component/components.global';
import { PageTestComponent } from 'src/page/page-test/page-test.component';
import { PolarJService } from 'src/service/polarj.service';
import { StorageService } from 'src/service/storage.service';
// import { BackendModuleServiceOnDifferrentPortLink } from 'src/app/app.constant';
export const environment = {
  browserTitle: 'PolarJ Dev',
  pathLabel: undefined,
  headerComponent: undefined,
  storageServiceType: StorageService,
  projectService: PolarJService,
  guardService: PolarJGuard,
  projectModule: PolarJModule,
  mainPageComponent: PageTestComponent,


  serviceLinkOnSamePort: false, //BackendModuleServiceOnDifferrentPortLink,
  serviceHost: 'localhost',
  serviceProtocal: 'http://',

  enableCaptcha: false,
  projectComponentTest: undefined as (PjProperty | undefined),
  production: false,
  enableLog : true,
  enableNav : true,
  enableFooter: false,
  // 是否允许匿名用户使用，如果允许匿名用户，直接进到首页，否则去到登录界面
  enableAnonymous: true,
  backendHost: '',//'192.168.43.16', // same host as frontend
  backendPort: '8080',
  backendPath: 'base',
  version: 'DEV', // 'DEV'
  buildSn: 'NOW' // 生产环境使用时标
};
