// 覆盖其他组件的背景动画效果

import { animate, state, style, transition, trigger } from '@angular/animations';

export const pjModalBgAnimation = trigger('bgStates', [
    state('nonEmpty', style({
        opacity: '1',
        background: 'linear-gradient( 119.04deg, rgba(25, 32, 44, 0.24) 17.85%, rgba(21, 21, 21, 0.06) 82.15% )'
    })),
    transition(':enter', animate('500ms ease-in')),
    transition(':leave', animate('500ms ease-in'))
]);