import {Component, OnInit} from '@angular/core';
import {MenuInterface} from '../../../core/interface/menu.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit {

    menuList: MenuInterface[] = [
        {
            name: 'first',
            url: '/r/first',
        },
        {
            name: 'drag',
            url: '/r/drag',
        },
        {
            name: 'switch-map',
            url: '/r/switch-map',
        }
    ];
    
    constructor(
        private router: Router,
    ) {
    }
    
    ngOnInit() {
    
    
    }
    
    
    goToUrl(url) {
        this.router.navigate([url]);
    }
}
