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
    ];
    
    router$: Subscription;
    
    constructor(
        private router: Router,
        private location: Location,
    ) {
    }
    
    ngOnInit() {
        this.router$ = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                console.log('event.url', event.url);
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
