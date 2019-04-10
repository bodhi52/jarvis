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
                content: `测试todolist，这是第${i}条`,
                created_at: moment().subtract(i, 'day').toDate().getTime(),
                updated_at: moment().subtract(i, 'day').toDate().getTime(),
                tag: 3,
                is_done: 1,
            });
        }
    }
    
}
