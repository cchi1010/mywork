// 从右边往左边打开的动画效果
import {
    animate, animation, style, transition, trigger, useAnimation
} from '@angular/animations';

const animations = {
    toOpen: animation(
        [
            style({ width: 0, left: '{{left}}', opacity: 0 }),
            animate(
                '500ms ease-out',
                style({ width: '*', left: '*', opacity: 1 })
            )
        ],
        {
            params: { left: '' }
        }
    ),
    toClose: animation(
        [
            style({ width: '*', left: '*', opacity: 1 }),
            animate(
                '500ms ease-in',
                style({ width: 0, left: '{{left}}', opacity: 0 })
            ),
        ],
        {
            params: { left: '' },
        }
    ),
};
export const pjRightToLeftAnimation = trigger('rightSideOpenClose', [
    transition(':enter', useAnimation(animations.toOpen)),
    transition(':leave', useAnimation(animations.toClose))
]);