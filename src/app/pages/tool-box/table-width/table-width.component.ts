import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-table-width',
    templateUrl: './table-width.component.html',
    styleUrls: ['./table-width.component.less']
})
export class TableWidthComponent implements OnInit {
    
    suffixList = ['%', 'px'];
    
    suffix: string;
    
    width: string;
    
    showResult: boolean = false;
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    showExample() {
        this.suffix = this.suffixList[0];
        this.width = JSON.stringify(['10%', '10%', '10%', '10%', '10%']);
    }
    
    submitForm() {
    
    }
}
