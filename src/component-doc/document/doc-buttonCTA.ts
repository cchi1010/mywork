import { PJ_BTN_TYPE } from "src/component/components.global";
import { PjButtonCtaComponent } from "src/component/pj-button/pj-button-cta/pj-button-cta.component";
import { PjColorDirective } from "src/directive/pj-color.directive";
import { PjSizeDirective } from "src/directive/pj-size.directive";
import { PjDocumentSectionData } from "src/page/page-document/pj-document-section/pj-document-section.type";

export const DOC_BUTTON_CTA: Array<PjDocumentSectionData> = [{
  title: 'Button CTA',
  description: '按钮组件，pjSize 指定了按钮的高度，外部容器决定其宽度，有四种类型，填充型，边框型，带阴影型和纯文本型'
}, {
  title: '基本用法',
  parameters: [{
    label: '@Input',
    textValue: ''
  }, {
    label: 'pjColor',
    textValue: '可取值为： primary, secondary, neutral, success, brand, error, '
  }, {
    label: 'pjSize',
    textValue: '可取值为： md, lg, xl'
  }]
}, {
  title: '使用举例',
  description: '<pj-button-cta btnType="filled" pjSize="lg" pjColor="secondary"></pj-round-accordion>',
  backgoundColor: '#DADFE5',
  arrangementType: 'row',
  components: [{
    componentType: PjButtonCtaComponent,
    componentData: { leftIconName: 'home', btnType: PJ_BTN_TYPE.FILLED, pjSize: 'lg', pjColor: 'secondary', label: 'Button CTA' },
    directives: [
      { directiveType: PjColorDirective, directiveData: { _color: 'secondary' } },
      { directiveType: PjSizeDirective, directiveData: { _size: 'lg' } }
    ],
  }, {
    componentType: PjButtonCtaComponent,
    componentData: { leftIconName: 'home', btnType: PJ_BTN_TYPE.OUTLINED, pjSize: 'lg', pjColor: 'secondary', label: 'Button CTA' },
    directives: [
      { directiveType: PjColorDirective, directiveData: { _color: 'secondary' } },
      { directiveType: PjSizeDirective, directiveData: { _size: 'lg' } }
    ],
  }, {
    componentType: PjButtonCtaComponent,
    componentData: { leftIconName: 'home', btnType: PJ_BTN_TYPE.ELEVATED, pjSize: 'lg', pjColor: 'secondary', label: 'Button CTA' },
    directives: [
      { directiveType: PjColorDirective, directiveData: { _color: 'secondary' } },
      { directiveType: PjSizeDirective, directiveData: { _size: 'lg' } }
    ],
  }, {
    componentType: PjButtonCtaComponent,
    componentData: { leftIconName: 'home', btnType: PJ_BTN_TYPE.TEXT, pjSize: 'lg', pjColor: 'secondary', label: 'Button CTA' },
    directives: [
      { directiveType: PjColorDirective, directiveData: { _color: 'secondary' } },
      { directiveType: PjSizeDirective, directiveData: { _size: 'lg' } }
    ],
  }, {
    componentType: PjButtonCtaComponent,
    componentData: { leftIconName: 'home', btnType: PJ_BTN_TYPE.FILLED, pjSize: 'lg', pjColor: 'secondary', label: 'Button CTA', disabled: true },
    directives: [
      { directiveType: PjColorDirective, directiveData: { _color: 'secondary' } },
      { directiveType: PjSizeDirective, directiveData: { _size: 'lg' } }
    ],
  }]
}];