import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router} from '@angular/router';

interface IBreadcrumb {
    label: string; // 用于显示的path
    params?: Params; // 跳转时所带参数
    url: string; // 跳转的url
}

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.less']
})
export class DefaultComponent implements OnInit {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    
    }
    
    ngOnInit() {
    }
    
    
}
