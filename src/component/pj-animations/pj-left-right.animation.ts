// 从右边往左边打开的动画效果
import {
    animate, animation, state, style, transition, trigger, useAnimation
} from '@angular/animations';

const animations = {
    toOpen: animation(
        [
            style({ width: 0, right: 0, opacity: 0 }),
            animate(
                '500ms ease-in',
                style({ width: '*', right: '*', opacity: 1 })
            )
        ],
        {
            params: { right: '' },
        }
    ),
    toClose: animation(
        [
            style({ width: '*', right: '*', opacity: 1 }),
            animate(
                '500ms ease-out',
                style({ width: 0, right: 0, opacity: 0 })
            ),
        ],
        {
            params: { right: '' },
        }
    ),
};
export const pjLeftToRightAnimation = trigger('leftSideOpenClose', [
    transition(':enter', useAnimation(animations.toOpen)),
    transition(':leave', useAnimation(animations.toClose))
]);