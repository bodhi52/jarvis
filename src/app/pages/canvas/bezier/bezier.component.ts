import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MenuInterface} from '../../../core/interface/menu.interface';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-bezier',
    templateUrl: './bezier.component.html',
    styleUrls: ['./bezier.component.less']
})
export class BezierComponent implements OnInit, OnDestroy {
    
    menuList: MenuInterface[] = [
        {
            url: '/canvas/bezier/basic',
            name: '基本贝塞尔曲线'
        },
        {
            url: '/canvas/bezier/segment',
            name: '分段贝塞尔曲线',
        }
    ];
    
    router$: Subscription;
    
    constructor(
        private router: Router,
        private location: Location
    ) {
    }
    
    ngOnInit() {
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
        this.router.navigateByUrl(url);
    }
}
