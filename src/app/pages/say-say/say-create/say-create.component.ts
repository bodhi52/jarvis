import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SaySayService} from '../../../core/service/say-say.service';
import {ErrorCodeEnum} from '../../../core/enum/error-code.enum';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-say-create',
    templateUrl: './say-create.component.html',
    styleUrls: ['./say-create.component.less']
})
export class SayCreateComponent implements OnInit {
    @Output() event: EventEmitter<{type: 'cancel' | 'success'}> = new EventEmitter();
    
    content: string = '';
    
    isLoading: boolean = false;
    
    constructor(
        private sayApi: SaySayService,
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    addTag() {
        this.content += '##输入标签名称##';
    }
    
    submit() {
        if (!this.content) {
            return;
        }
        this.isLoading = true;
        this.sayApi.create({
            content: this.content,
        }).subscribe(res => {
            this.isLoading = false;
            if (res.code === ErrorCodeEnum.SUCCESS) {
                this.msg.success('添加成功');
                this.event.emit({type: 'success'});
            }
        });
    }
    
    cancel() {
        this.event.emit({type: 'cancel'});
    }
    
}
