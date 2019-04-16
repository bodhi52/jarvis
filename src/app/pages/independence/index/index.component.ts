import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
    
    menuList: {
        url: string,
        text: string,
    }[] = [];
    
    constructor() {
    }
    
    ngOnInit() {
        this.menuList = [
            {
                url: '/jarvis',
                text: 'Jarvis',
            },
            {
                url: 'three',
                text: 'Three',
            },
            {
                url: 'tool-box',
                text: 'tool box'
            }
            
        ];
    }
    
}
