import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-table-setting',
    templateUrl: './table-setting.component.html',
    styleUrls: ['./table-setting.component.less']
})
export class TableSettingComponent implements OnInit {
    @ViewChild('copyArea') copyArea: ElementRef;
    tableItem: string;
    
    prefix: string;
    
    translateList: string[];
    
    tableHeaderList: string[];
    
    tableWidth: string;
    
    showResult = false;
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    submitForm() {
        const arr = this.tableItem.split('\n');
        this.getTranslate(arr);
        if (this.prefix) {
            this.getTableHeader(arr);
            this.getTableWidth(arr);
        }
        this.showResult = true;
    }
    
    showExample() {
        this.tableItem = `Created Time
            Coin
            Amount
            Status
            Tx
            To Wallet
        Update`.replace(/    /g, '');
        
        this.prefix = 'Asset.WithdrawHistory';
        this.submitForm();
    }
    
    copy(type: string) {
        switch (type) {
            case 'translate':
                // 将对应的数据填充到拷贝的div中
                this.copyArea.nativeElement.innerText = this.translateList.join('\n');
                this.copyText();
                break;
            case 'tableHeader':
                this.copyArea.nativeElement.innerText = this.tableHeaderList.join('\n');
                this.copyText();
                break;
            case 'tableWidth':
                this.copyArea.nativeElement.innerText = this.tableWidth;
                this.copyText();
                break;
        }
    }
    
    getTranslate(arr) {
        this.translateList = arr.map(item => {
           return '"' + item.replace(/ /g, '') + '": "' + item.trim() + '",';
        });
    }
    
    getTableHeader(arr) {
        this.tableHeaderList = arr.map((item) => {
            return `<th>{{'${this.prefix}.` + item.replace(/ /g, '') + `' | translate}}</th>`;
        });
    }
    
    getTableWidth(arr, suffix = '%') {
        const per = Math.floor(100 / arr.length);
        const lave = 100;
        this.tableWidth = '[' + arr.map(item => {
            if (lave - per * 2 >= 0) {
                return per + '%';
            } else {
                return lave + '%';
            }
        }).join(', ') + ']';
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
