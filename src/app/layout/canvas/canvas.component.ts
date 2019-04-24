import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MenuInterface} from '../../core/interface/menu.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.less']
})
export class CanvasComponent implements OnInit, OnDestroy {
    menuList: MenuInterface[] = [
        {
            url: '/canvas/sin-cos',
            name: 'sin-cos'
        },
        {
            url: '/canvas/line',
            name: 'line',
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
        this.router.navigateByUrl(url);
    }
    
}
