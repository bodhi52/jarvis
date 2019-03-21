import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-high-level',
    templateUrl: './high-level.component.html',
    styleUrls: ['./high-level.component.less']
})
export class HighLevelComponent implements OnInit {
    
    prefix: string;
    
    zhTran: string;
    enTran: string;
    koTran: string;
    
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    showExample() {
        this.prefix = 'account.user';
        this.submitForm();
    }
    
    submitForm() {
    
    }
}
