import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-translate-google-doc',
    templateUrl: './translate-google-doc.component.html',
    styleUrls: ['./translate-google-doc.component.less']
})
export class TranslateGoogleDocComponent implements OnInit {
    
    @ViewChild('copyArea') copyArea: ElementRef;
    tableItem: string;
    
    prefix: string;
    
    tableList: number[] = [];
    
    translateKey: string[] = [];
    translateValue: string[] = [];
    
    isHighLevel: boolean = false;
    
    basic = {
        prefix: null,
        tran: null,
    };
    
    zhTran: string;
    enTran: string;
    koTran: string;
    
    enArr: {key: string, value: string}[] = [];
    
    showResult = false;
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    submitForm() {
        if (this.isHighLevel) {
            // 先将三个
        } else {
            this.translateKey = [];
            this.translateValue = [];
            this.tableList = [];
            this.showResult = false;
            try {
                this.strToArr(this.enArr, this.basic.tran, this.prefix);
                this.showResult = true;
                for (let i = 0, len = this.translateValue.length; i < len; i ++) {
                    this.tableList.push(i);
                }
            } catch (e) {
                this.msg.error('json格式错误。检查json（我会在外层加上{}，所以你只需关注你自己的json内容)');
            }
        }
        
    }
    
    showExample() {
        this.basic.tran = `"BusinessDescription": "Business description",
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
        this.basic.prefix = 'account.user';
        this.submitForm();
    }
    
    changeTab($event) {
        this.showResult = false;
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
        for (const i of this.tableList) {
            arr.push(this.translateKey[i] + '&#9;' + this.translateValue[i]);
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
