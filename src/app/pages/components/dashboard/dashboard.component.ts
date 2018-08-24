import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {timer} from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    
    param: object = {
        name: 'Jarvis',
    };
    
    introduce = '';
    
    constructor(
        public translate: TranslateService,
    ) {
    }
    
    ngOnInit() {
        this.translate.get('Hello', {value: 'world'}).subscribe((res: string) => {
            console.log('res', res);
        });
        this.translate.get(
            'Introduce.Name',
            {name: 'Jarvis'}
        ).subscribe((res: string) => {
            console.log('res', res);
            this.introduce += res;
        });
        
        this.translate.get(
            'Introduce.Today',
            {
                date: new Date().getDate(),
                time: new Date().getTime()
            },
        ).subscribe((res: string) => {
            this.introduce += ', ' + res;
    
            console.log('res', res);
        });
    }
    
}
