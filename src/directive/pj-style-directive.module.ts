import { NgModule } from '@angular/core';
import { PjColorDirective, PjDefaultColorDirective } from './pj-color.directive';
import { PjDisableDirective } from './pj-disable.directive';
import { PressableDirective } from './pj-pressed.directive';
import { PjDefaultSizeDirective, PjSizeDirective } from './pj-size.directive';

@NgModule({
  declarations: [
    PressableDirective,
    PjSizeDirective,
    PjDefaultSizeDirective,
    PjColorDirective,
    PjDefaultColorDirective,
    PjDisableDirective
  ],
  imports: [
  ],
  exports: [
    PressableDirective,
    PjSizeDirective,
    PjDefaultSizeDirective,
    PjColorDirective,
    PjDefaultColorDirective,
    PjDisableDirective
  ]
})
export class PjDirectiveModule { }
