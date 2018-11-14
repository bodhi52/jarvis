import {Component, HostBinding, OnInit} from '@angular/core';
import {animate, group, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-animations',
    templateUrl: './animations.component.html',
    styleUrls: ['./animations.component.less'],
    animations: [
        trigger('openClose', [
            state('true', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow',
            })),
            state('false', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green',
            })),
            transition('false <=> true', animate('1s', keyframes([
                style({opacity: 0.1, offset: 0.1}),
                style({opacity: 0.6, offset: 0.2}),
                style({opacity: 1, offset: 0.5}),
                style({opacity: 0.2, offset: 0.7}),
            ]))),
        ]),
        trigger('pageAnimations', [
            transition(':enter', [
                query('*', [
                    style({opacity: 0, transform: 'translateY(-100px)'}),
                    stagger(-300, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({
                            opacity: 1,
                            transform: 'none',
                        }))
                    ])
                ])
            ])
        ]),
        trigger('flyInOut', [
            state('in', style({
                width: 120,
                transform: 'translateX(0)',
                opacity: 1,
            })),
            transition('void => *', [
                style({
                    width: 10,
                    transform: 'translateX(50px)',
                    opacity: 0,
                }),
                group([
                    animate('0.3s 0.5s ease', style({
                        transform: 'translateX(0)',
                        width: 120,
                    })),
                    animate('0.3s ease-in', style({
                        opacity: 1,
                        backgroundColor: 'red'
                    }))
                ])
            ]),
            transition('* => void', [
                group([
                    animate('0.3s ease', style({
                        transform: 'translateX(50px)',
                        width: 10,
                    })),
                    animate('0.3s 0.2s ease', style({
                        opacity: 0,
                    }))
                ])
            ])
        ])
    ]
})
export class AnimationsComponent implements OnInit {
    
    state = 'inactive';
    
    show = true;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    changeState() {
        this.state = this.state === 'inactive' ? 'active' : 'inactive';
        this.show = !this.show;
    }
    
    onAnimationEvent($event) {
        console.log(event);
    }
}
