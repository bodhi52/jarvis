import {Component, HostListener, OnInit} from '@angular/core';
import {TodoInterface} from '../../../core/interface/todo.interface';
import * as moment from 'moment';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.less']
})
export class ToDoListComponent implements OnInit {
    todoList: TodoInterface[] = [];
    
    inputValue: string;
    
    constructor() {
    }
    
    ngOnInit() {
        this.createData();
    }
    
    createData() {
        for (let i = 0; i < 3; i++) {
            this.todoList.push({
                id: i,
                content: `测试todoList，这是第${i}条`,
                created_at: moment().subtract(i, 'day').toDate().getTime(),
                updated_at: moment().subtract(i, 'day').toDate().getTime(),
                tag: 3,
                status: 1,
                statusName: this.getStatusName(1),
            });
        }
    }
    
    /**
     * 获得状态的文字
     * @param status
     */
    getStatusName(status: number): string {
        let name = '';
        switch (status) {
            case 0:
                name = '未完成';
                break;
            case 1:
                name = '已完成';
                break;
            case 2:
                name = '已废弃';
                break;
        }
        return name;
    }
    
}
