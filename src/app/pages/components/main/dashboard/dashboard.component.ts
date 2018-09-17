import {Component, OnInit} from '@angular/core';
import {PaginatorInterface} from '../../../../interface/paginator.interface';
import {PaginatorConst} from '../../../../const/paginator.const';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    
    allChecked = false;
    indeterminate = false;
    displayData = [];
    data = [
        {
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            checked: false,
            disabled: false
        },
        {
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            checked: false,
            disabled: false
        },
        {
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            checked: false,
            disabled: false
        },
        {
            name: 'Disabled User',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            checked: false,
            disabled: true
        }
    ];
    
    // 分页数据
    pagination: PaginatorInterface = Object.assign({}, PaginatorConst);
    
    constructor() {
    }
    
    ngOnInit() {
        for (let i = 0; i < 30; i ++) {
            this.data.push({
                name: 'tony-' + i,
                age: 32,
                address: 'New York No. 1 Lake Park',
                checked: false,
                disabled: false
            });
        }
    }
    
    
    getData() {
    
    }
    
}
