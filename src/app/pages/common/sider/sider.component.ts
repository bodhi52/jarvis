import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-sider',
    templateUrl: './sider.component.html',
    styleUrls: ['./sider.component.less']
})
export class SiderComponent implements OnInit {
    
    constructor() {
    }
    
    ngOnInit() {
        this.getDate();
    }
    
    /**
     * 获得当前的日期时间
     */
    getDate() {
        console.log(moment().toDate());
    }
}
