import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-say-create',
    templateUrl: './say-create.component.html',
    styleUrls: ['./say-create.component.less']
})
export class SayCreateComponent implements OnInit {
    @Output() event: EventEmitter<{type: 'cancel' | 'success'}> = new EventEmitter();
    
    content: string = '';
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    addTag() {
        this.content += '#输入标签名称#';
    }
    
    submit() {
        this.event.emit({type: 'success'});
    }
    
    cancel() {
        this.event.emit({type: 'cancel'});
    }
    
}
