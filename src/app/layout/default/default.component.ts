import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router} from '@angular/router';
import {MenuInterface} from '../../core/interface/menu.interface';
import {MenuService} from '../../core/service/menu.service';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit, OnDestroy {
    
    menuList: MenuInterface[] = [
        {
            name: 'Dashboard',
            url: '/d',
            icon: 'dashboard',
        },
        {
            name: 'TODO',
            url: '/todo',
            icon: 'bars',
        },
        {
            name: 'Say Say',
            url: '/say-say',
            icon: 'message',
        },
        {
            name: 'Code',
            url: '/code',
            icon: 'code',
        }
    ];
    
    router$: Subscription;
    
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private menuService: MenuService,
    ) {
    
    }
    
    ngOnInit() {
        this.router$ = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log('event', event);
                this.menuService.checkMenuSelected(event.url, this.menuList);
            }
        });
        this.menuService.checkMenuSelected(location.href, this.menuList);
    }
    
    ngOnDestroy(): void {
        this.router$.unsubscribe();
    }
}
