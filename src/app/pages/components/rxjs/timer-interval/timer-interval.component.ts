import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, timer} from 'rxjs';

@Component({
    selector: 'app-timer-interval',
    templateUrl: './timer-interval.component.html',
    styleUrls: ['./timer-interval.component.less']
})
export class TimerIntervalComponent implements OnInit, OnDestroy {
    
    timer$: Subscription;
    interval$: Subscription;
    
    constructor() {
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        // this.timer$ = timer(1000).subscribe(num => {
        //     console.log('timer num', num);
        // });
        console.log('init');
        this.interval$ = interval(5000).subscribe(num => {
            console.log('interval num', num);
        });
    }
    
    ngOnDestroy() {
        this.timer$.unsubscribe();
    }
    
    
}
