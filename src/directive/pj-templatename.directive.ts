import { Directive, Input, NgModule, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[templateName]'
})
export class PjTemplateNameDirective {

    @Input() templateName?: string;

    constructor(public template: TemplateRef<any>) {
    }
}

@NgModule({
    declarations: [
        PjTemplateNameDirective
    ],
    exports: [
        PjTemplateNameDirective
    ]
})
export class PjTemplateNameModule { }
