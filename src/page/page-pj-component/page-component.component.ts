import { ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AppLayoutService, LayoutElmName } from "src/app/app-layout.service";
import { AppConfigService } from "src/app/app.config";
import { PjTemplateNameDirective } from "src/directive/pj-templatename.directive";
import { RoutingService } from "src/service/routing.service";
import { TestHeaderComponent } from "../page-test/test-header/test-header.component";
import { PjSideMenuItem } from "src/component/components.global";

@Component({
    selector: 'page-component',
    template: ``,
    styleUrls: []
})
export class PageComponentComponent implements OnInit {

    private _selectedComponentName?: string;

    protected _componentMenu?: Array<PjSideMenuItem>;

    @ViewChild('emptyTemplate')
    private _blankRef: TemplateRef<any> | null = null;

    @ViewChildren(PjTemplateNameDirective)
    private _compTemplates?: QueryList<PjTemplateNameDirective>;

    private _currentPath$ = new BehaviorSubject<string>('');

    constructor(protected _layoutService: AppLayoutService, private _routeInfo: ActivatedRoute,
        private _routingService: RoutingService, protected _appCfgService: AppConfigService,
        private _cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this._routeInfo.paramMap.subscribe((para) => {
            this._selectedComponentName = para.get('componentName') || '';
        });
        this._initialComponentMenu();
        this._layoutService.attachHeaderComponent(TestHeaderComponent);
        this._layoutService.close(LayoutElmName.NAVBAR);
        this._layoutService.close(LayoutElmName.TOOLBAR);
        this._layoutService.close(LayoutElmName.FOOTER);
        this._appCfgService.resetMenuItem(this._componentMenu || []);
        this._currentPath$.subscribe(path => this._appCfgService.resetFocusedMenuItem(path, true));
        this._routeInfo.url.subscribe(urls => {
            let _currentActivedPath = '';
            urls.forEach(url => {
                _currentActivedPath += (url.path + '/');
            });
            this._currentPath$.next(_currentActivedPath);
        });
    }

    protected _initialComponentMenu(): void {

    }

    getComponentMenu(): Array<PjSideMenuItem> {
        return this._componentMenu || [];
    }

    private _shownTemplateRef: TemplateRef<any> | null = null;
    ngAfterViewChecked(): void {
        let ref = this._currentTemplateRef();
        if (ref != this._shownTemplateRef) {
            this._shownTemplateRef = ref;
            this._cdRef.detectChanges();
        }
    }
    getSelectedComponentTemplateRef(): TemplateRef<any> | null {
        return this._shownTemplateRef;
    }

    private _currentTemplateRef(): TemplateRef<any> | null {
        if (this._selectedComponentName == null || this._compTemplates == null || this._compTemplates.length == 0) {
            return this._blankRef;
        }
        let whichRef: TemplateRef<any> | null = this._blankRef;
        this._compTemplates.forEach(ref => {
            if ((this._selectedComponentName != null
                && this._selectedComponentName?.length > 0)
                && (ref.templateName === ('component' + this._selectedComponentName.slice(0, 1).toUpperCase() + this._selectedComponentName.substring(1)))) {
                whichRef = ref.template;
            }
        });
        return whichRef;
    }

    protected gotoComponentLink(componentBaseName: string, componentName: string): void {
        this._routingService.gotoUrl(componentBaseName + '/' + componentName);
    }
}  