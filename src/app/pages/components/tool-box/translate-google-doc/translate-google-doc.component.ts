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
    
    showResult = false;
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    submitForm() {
        this.translateKey = [];
        this.translateValue = [];
        this.tableList = [];
        this.showResult = false;
        try {
            const obj = JSON.parse('{' + this.tableItem + '}');
            this.objectToString(this.prefix, obj);
            this.showResult = true;
            for (let i = 0, len = this.translateValue.length; i < len; i ++) {
                this.tableList.push(i);
            }
        } catch (e) {
            this.msg.error('json格式错误。检查json（我会在外层加上{}，所以你只需关注你自己的json内容)');
        }
    }
    
    showExample() {
        this.tableItem = `"ApiKey": {
    "BusinessDescription": "Business description",
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
}
    `;
        
        this.prefix = 'account.user.ApiKey';
        this.submitForm();
    }
    
    objectToString(key, obj) {
        for (const i of Object.keys(obj)) {
            if (typeof obj[i] === 'string') {
                // console.log(key + '.' + i + ': ' + obj[i]);
                this.translateKey.push(key + '.' + i);
                this.translateValue.push(obj[i]);
                continue;
            }
            if (typeof obj[i] === 'object') {
                this.objectToString(key + '.' + i, obj[i]);
            }
        }
    }
    
    
    copy(type: string) {
        switch (type) {
            case 'key':
                // 将对应的数据填充到拷贝的div中
                this.copyArea.nativeElement.innerText = this.translateKey.join('\n');
                this.copyText();
                break;
            case 'value':
                this.copyArea.nativeElement.innerText = this.translateValue.join('\n');
                this.copyText();
                break;
        }
    }
    
    /**
     * 复制文本
     */
    copyText() {
        const myEle = document.getElementById('copy-area');
        const range = document.createRange();
        const selection = window.getSelection();
        
        range.selectNodeContents(myEle);
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
