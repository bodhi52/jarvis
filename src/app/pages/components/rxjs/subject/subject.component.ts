import {Component, OnInit} from '@angular/core';
import {from, Subject} from 'rxjs';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.less']
})
export class SubjectComponent implements OnInit {
    
    subject: Subject<number>;
    
    constructor() {
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        this.subject = new Subject<number>();
        
        this.subject.subscribe(res => {
           console.log('a ', res);
        });
        
        this.subject.subscribe(res => {
            console.log('b ', res);
        });
        
        const observable = from([1, 2, 3]);
        observable.subscribe(this.subject);
    }
    
}
