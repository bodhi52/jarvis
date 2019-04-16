import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {timer} from 'rxjs';

@Component({
    selector: 'app-basic-level',
    templateUrl: './basic-level.component.html',
    styleUrls: ['./basic-level.component.less']
})
export class BasicLevelComponent implements OnInit, AfterViewInit {
    
    @ViewChild('copyArea') copyArea: ElementRef;
    
    prefix: string;
    
    tran: string;
    
    showResult: boolean = false;
    
    resultArr: {key: string, value: string}[] = [];
    
    copyTextArea: string = '';
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit(): void {
        // this.showExample();
    }
    
    /**
     * 重置
     */
    reset() {
        this.prefix = null;
        this.tran = null;
        this.showResult = false;
        this.resultArr = [];
    }
    
    submitForm() {
        this.resultArr = [];
        this.showResult = false;
        try {
            this.strToArr(this.resultArr, this.tran, this.prefix);
            this.showResult = true;
        } catch (e) {
            this.msg.error('json格式错误，请检查json');
        }
        
    }
    
    showExample() {
        this.tran = `{
    "BusinessDescription": "<div>Business description</div>",
    "CreateNewAPI": "Create New API",
    "MyAPIkey": "My API key",
    "Created": "Created",
    "Notes": "Notes",
    "Status": "Status",
    "Normal": "Normal",
    "Delete": "Delete",
    "Edit": "Edit",
    "AccessKey": "Access Key",
    "CreationTime": "Creation Time",
    "ExpireTime": "Expire Time",
    "BindingIPAddress": "Binding IP Address",
    "ApiKeyStatus": {
        "Normal": "Normal",
        "Expired": "Expired",
        "Disable": "Banned"
    }
}`;
        this.prefix = 'account.user';
        this.submitForm();
    }
    
    strToArr(arr, str, key = '') {
        const obj = JSON.parse(str);
        this.objectToString(arr, obj);
    }
    
    objectToString(arr, obj, key = '') {
        if (key) {
            key += '.';
        }
        for (const i of Object.keys(obj)) {
            if (typeof obj[i] === 'string') {
                arr.push({
                    key: key + i,
                    value: obj[i],
                });
                continue;
            }
            if (typeof obj[i] === 'object') {
                this.objectToString(arr, obj[i], key + i);
            }
        }
    }
    
    
    copy() {
        const arr = [];
        const prefix = this.prefix ? this.prefix + '.' : '';
        for (const i of this.resultArr) {
            arr.push(prefix + i.key + '\t' + i.value);
        }
        // 将对应的数据填充到拷贝的textarea中
        this.copyTextArea = arr.join('\n');
        // 上面语句是给textArea赋值，所以复制的命令需要个延时
        timer(0).subscribe(() => this.copyText());
    }
    
    /**
     * 复制文本
     */
    copyText() {
        const inputEl: HTMLTextAreaElement = this.copyArea.nativeElement;
        inputEl.select();
        
        try {
            if (document.execCommand) {
                // 复制选中的文字到剪贴板
                document.execCommand('copy', false, null);
                this.msg.success('复制成功');
                
            }
        } catch (e) {
            console.log('不支持复制命令：', e);
            this.msg.error('不支持复制命令');
            
        }
    }
    
}
