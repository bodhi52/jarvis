import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuInterface} from '../../../core/interface/menu.interface';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

@Component({
    selector: 'app-tool-box',
    templateUrl: './tool-box.component.html',
    styleUrls: ['./tool-box.component.less']
})
export class ToolBoxComponent implements OnInit, OnDestroy {
    menuList: MenuInterface[] = [
        {
            name: 'table setting',
            url: '/tool-box/table-setting',
        },
        // {
        //     name: 'table width',
        //     url: '/tool-box/table-width',
        // },
        {
            name: '翻译文件->谷歌文档',
            url: '/tool-box/translate-google-doc',
        },
        {
            name: '谷歌文档->翻译文件',
            url: '/tool-box/google-doc-translate',
        }
    ];
    
    router$: Subscription;
    
    constructor(
        private router: Router,
        private location: Location,
    ) {
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        this.router$ = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeUrl(event.url);
            }
        });
        // 先手动执行一次
        const url = this.location.path();
        this.activeUrl(url);
    }
    
    ngOnDestroy() {
        this.router$.unsubscribe();
    }
    
    activeUrl(url: string) {
        this.menuList.forEach(item => {
           if (url.indexOf(item.url) !== -1) {
               item.is_selected = true;
           }
        });
    }
    
    goToUrl(url) {
        this.router.navigate([url]);
    }
    
}
