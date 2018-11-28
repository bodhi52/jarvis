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
                url: 'd',
                text: 'Dashboard',
            },
            {
                url: 't',
                text: 'Training',
            },
            {
                url: 'r',
                text: 'RxJS',
            },
            {
                url: 'canvas',
                text: 'Canvas',
            },
            {
                url: 'three',
                text: 'Three',
            },
            
        ];
    }
    
}
