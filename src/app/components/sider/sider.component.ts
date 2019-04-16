import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sider',
    templateUrl: './sider.component.html',
    styleUrls: ['./sider.component.less']
})
export class SiderComponent implements OnInit {
    
    week: number = 0; // 周数
    day: number = 0; // 天数
    
    constructor(
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        const begin = moment('2019-02-10');
        const now = moment();
        const days = Math.floor(Math.abs(moment.duration(begin.diff(now)).asDays()));
        this.week = Math.floor(days / 7);
        this.day = days % 7;
        
    }
    
    linkTo(url) {
        this.router.navigateByUrl(url);
    }
}
