import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

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
        this.showResult = false;
        try {
            this.strToArr(this.resultArr, this.tran, this.prefix);
            this.showResult = true;
        } catch (e) {
            this.msg.error('json格式错误，请检查json');
        }
        
    }
    
    showExample() {
        this.tran = `"BusinessDescription": "Business description",
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
    }`;
        this.prefix = 'account.user';
        this.submitForm();
    }
    
    strToArr(arr, str, key = '') {
        const obj = JSON.parse('{' + str + '}');
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
        const prefix = this.prefix ? this.prefix + '.' : null;
        for (const i of this.resultArr) {
            arr.push(prefix + i.key + '&#9;' + i.value);
        }
        // 将对应的数据填充到拷贝的div中
        this.copyArea.nativeElement.innerHTML = '<pre>' + arr.join('\n') + '</pre>';
        this.copyText();
    }
    
    /**
     * 复制文本
     */
    copyText() {
        // const myEle = document.getElementById('copy-area');
        const myEle = document.getElementsByTagName('pre');
        console.log('myEle', myEle[0]);
        const range = document.createRange();
        const selection = window.getSelection();
        
        range.selectNodeContents(myEle[0]);
        selection.removeAllRanges(); // 先移除掉所有的选择区域
        selection.addRange(range); // 添加元素的目标选择区域
        try {
            if (document.execCommand) {
                // 复制选中的文字到剪贴板
                document.execCommand('copy', false, null);
                selection.removeAllRanges(); // 移除掉所有的选择区域
                this.msg.success('复制成功');
                
            }
        } catch (e) {
            console.log('不支持复制命令：', e);
            this.msg.error('不支持复制命令');
            
        }
    }
    
}
