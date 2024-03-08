import { PjRoundAccordionComponent } from "src/component/pj-accordion/pj-round-accordion/pj-round-accordion.component";

export const DOC_ACCORDION = [{
  title: 'Accordion',
  description: 'Accordion组件是一个垂直堆叠的标题列表，可以显示或隐藏相关的内容部分。'
}, {
  title: '基本用法',
  description: 'Alert组件通过渐进式披露在小空间内提供大量内容。Accordion标题为用户提供了其内容的高级概述，允许用户自己决定阅读哪些部分。该组件可以使信息处理和发现更加有效。但是，Accordion组件由于对用户隐藏了内容，如果用户非常需要阅读所有内容，则不要使用该组件，因为它会增加额外点击的负担，此时应该使用带有正常标题的完整滚动页面。',
  parameters: [{
    label: '@Input',
    textValue: ''
  }, {
    label: 'accordionData',
    textValue: '{ label: string, iconName: string, descriptions:string}'
  }]
}, {
  title: '使用举例',
  description: '<pj-round-accordion [accordionData]="{ iconName: \'home\', label: \'Example\', description: \'Accordion description\', expanded: false }"></pj-round-accordion>',
  components: [{
    componentType: PjRoundAccordionComponent,
    hasContent: true,
    componentData: { accordionData: { iconName: 'home', label: 'Example', description: 'Accordion description', expanded: false } }
  }]
}];