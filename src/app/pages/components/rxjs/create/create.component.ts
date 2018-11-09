import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.less'],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class CreateComponent implements OnInit {
    
    observable$: Observable<any>;
    
    constructor() {
    }
    
    ngOnInit() {
        // this.observable$ = Observable.create((observer: Observer<number>): TeardownLogic => {
        //     observer.next(1);
        //     observer.next(2);
        //     observer.next(3);
        //     observer.complete();
        // });
        //
        // this.observable$.subscribe(
        //     res => {
        //         console.log(res);
        //     },
        //     err => {
        //         console.log(err);
        //     },
        //     () => {
        //         console.log('complete');
        //     }
        // );
        //
        of(1, 2, 3).subscribe(res => {
            console.log(res);
        });
    }
    
}
