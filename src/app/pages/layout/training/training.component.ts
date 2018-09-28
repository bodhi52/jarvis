import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {MenuInterface} from '../../../core/interface/menu.interface';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.less']
})
export class TrainingComponent implements OnInit, OnDestroy {
    
    routerSubscription: Subscription;
    
    menuList: MenuInterface[] = [
        {
            url: '/t/dashboard',
            icon: 'anticon-appstore',
            name: 'Dashboard',
        },
        {
            url: '/t/list',
            icon: 'anticon-appstore',
            name: 'Hero List',
        }
    ];
    
    constructor(
        private router: Router,
    ) {
        const url = this.router.routerState.snapshot.url;
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.menuList.forEach(item => {
                    item.is_selected = (item.url && url.indexOf(item.url) === 0);
                });
            }
        });
    }
    
    ngOnInit() {
    }
    
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }
    
    jumpUrl(menu: MenuInterface) {
        if (menu && menu.url) {
            this.router.navigate([menu.url]);
        }
    }
    
}
