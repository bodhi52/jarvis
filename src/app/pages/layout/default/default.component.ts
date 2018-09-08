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
    
    // 面包屑订阅
    breadcrumbSubscription: Subscription;
    
    // 面包屑
    breadcrumbs: IBreadcrumb[];
    
    // 面包屑
    _breadcrumbs: IBreadcrumb[];
    
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        // 面包屑
        this.breadcrumbSubscription = this.router.events.subscribe((event) => {
            console.log('event', event);
            if (event instanceof NavigationEnd) {
                const root: ActivatedRoute = this.activatedRoute.root;
                console.log('root', root);
    
                this._breadcrumbs = this.getBreadcrumbs(root).reduce((x, y) => x.findIndex(e => e.label === y.label) < 0 ? [...x, y] : x, []);
                
                this.breadcrumbs = this._breadcrumbs;
                console.log(this.breadcrumbs);
            }
        });
    }
    
    ngOnInit() {
        this.breadcrumbSubscription.unsubscribe();
    }
    
    /**
     * 获得面包屑
     * @param route
     * @param url
     * @param breadcrumbs
     */
    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
        
        // get the child routes
        const children: ActivatedRoute[] = route.children;
        
        if (children.length === 0) {
            return breadcrumbs;
        }
        
        for (const child of children) {
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            
            url += `/${routeURL}`;
            const breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                url: url
            };
            
            breadcrumbs.push(breadcrumb);
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }
}
