import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { PagingData } from 'src/model/base.model';
import { FunctionalityModel } from 'src/model/functionality.model';
import { ModelService } from 'src/service/model.service';

@Injectable({
    providedIn: 'root'
})
export class RbacService extends ModelService {

    protected override getModuleServiceName(): string {
        return 'rbac';
    }

    fetchFunctionalities(): Observable<PagingData<FunctionalityModel>> {
        return this.fetchEntities(RbacModelContextPath.Functionality) as Observable<PagingData<FunctionalityModel>>;
    }

    fetchClassOperations(): Observable<PagingData<FunctionalityModel>> {
        return this.fetchEntities(RbacModelContextPath.Functionality, { type: 'MODEL_CLASS_OPERATION' }) as Observable<PagingData<FunctionalityModel>>;
    }

    fetchMainMenu(): Observable<Array<FunctionalityModel>> {
        let navMenu$ = this.fetchEntities(RbacModelContextPath.Functionality, { type: 'NAV_MENU', pageIndex: 0, curPageSize: 100 }) as Observable<PagingData<FunctionalityModel>>;
        let toolMenu$ = this.fetchEntities(RbacModelContextPath.Functionality, { type: 'TOOLBAR_MENU', pageIndex: 0, curPageSize: 100 }) as Observable<PagingData<FunctionalityModel>>;
        return forkJoin({nav: navMenu$, toolbar: toolMenu$}).pipe( map(v => {
            let funs = new Array<FunctionalityModel>();
            funs = funs.concat(v.nav.dataList||[]);
            funs = funs.concat(v.toolbar.dataList||[]);
            return funs
        }));
    }
}

const RbacModelContextPath = {
    Functionality: 'functionalitys'
}