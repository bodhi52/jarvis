import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'app-google-doc-translate',
    templateUrl: './google-doc-translate.component.html',
    styleUrls: ['./google-doc-translate.component.less']
})
export class GoogleDocTranslateComponent implements OnInit {
    
    @ViewChild('copyArea') copyArea: ElementRef;
    tableItem: string;
    
    en: object = null;
    ko: object = null;
    zh: object = null;
    
    showResult = false;
    
    constructor(
        private msg: NzMessageService,
    ) {
    }
    
    ngOnInit() {
    }
    
    submitForm() {
        if (!this.tableItem) {
            this.msg.error('请输入谷歌文档中的翻译文字');
            return;
        }
        this.showResult = false;
        this.transformToJson();
        this.showResult = true;
    }
    
    showExample() {
        this.tableItem = `account.user.ApiKey.BusinessDescription	Business description	业务说明：	비즈니스 디스크립션
account.user.ApiKey.Description	DCEX provides an API that can be used to help you achieve the power of your business such as Market Query, Automated trading, and more. To learn more about the full API services provided by DCEX, please refer to the DCEX API Documentation.	DCEX提供了可用于帮助您实现业务需求的各类强大功能的API。您可以通过DCEX API查询行情、完成自动交易等。要了解DCEX提供的完整的API服务，请参考DCEX API文档。	DCEX는 회원님의 시장 조사 및 자동 트레이딩과 같은 비즈니스에서 도움이 될 API를 제공합니다. DCEX에서 제공하는 전체 API 서비스에 대한 자세한 내용은 DCEX API 문서를 참조하십시오.
account.user.ApiKey.CreateNewAPI	Create New API	创建新API	API 생성
account.user.ApiKey.MyAPIkey	My API key	我的API Key	나의 API key
account.user.ApiKey.Created	Created	已创建 	생성 됨
account.user.ApiKey.Notes	Notes	备注	메모
account.user.ApiKey.Status	Status	状态	상태
account.user.ApiKey.Normal	Normal	正常	정상`;
        
        this.submitForm();
    }
    
    transformToJson() {
        const enObj: object = {};
        const koObj: object = {};
        const zhObj: object = {};
        const arr = this.tableItem.split('\n');
        for (const i of arr) {
            const item = i.split('\t');
            // 第一个为key，需要继续解key
            const keyArr = item[0].split('.');
            const len = keyArr.length;
            let itemEnObj = enObj;
            let itemZnObj = zhObj;
            let itemKoObj = koObj;
            keyArr.forEach((v, index) => {
                v = String(v);
                if (index + 1 === len) {
                    itemEnObj[v] = item[1];
                    itemZnObj[v] = item[2];
                    itemKoObj[v] = item[3];
                    return;
                }
                if (!itemEnObj[v]) {
                    itemEnObj[v] = {};
                    itemZnObj[v] = {};
                    itemKoObj[v] = {};
                }
                itemEnObj = itemEnObj[v];
                itemZnObj = itemZnObj[v];
                itemKoObj = itemKoObj[v];
            });
        }
        
        this.en = enObj;
        this.zh = zhObj;
        this.ko = koObj;
    }
    
    syntaxHighlight(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    
}
