import {Injectable} from '@angular/core';
import {MenuInterface} from '../interface/menu.interface';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    
    private menuList: MenuInterface[] = [
        {
            name: 'TODO',
            url: '/todo',
            icon: 'bars',
        },
        {
            name: 'Say Say',
            url: '/saysay',
            icon: 'message',
        },
        {
            name: 'Code',
            url: '/code',
            icon: 'code',
        }
    ];
    
    constructor() {
    }
    
    public checkMenuSelected(url: string, menuList: MenuInterface[]): MenuInterface {
        let menu: MenuInterface = null;
        menuList.forEach((item: MenuInterface) => {
            if (url.indexOf(item.url) !== -1) {
                item.is_selected = true;
                menu = JSON.parse(JSON.stringify(item));
                return;
            }
            if (item.sub_pages_url && item.sub_pages_url.length) {
                for (const i of item.sub_pages_url) {
                    if (url.indexOf(i) !== -1) {
                        item.is_selected = true;
                        menu = JSON.parse(JSON.stringify(item));
                        return;
                    }
                }
            }
            item.is_selected = false;
        });
        return menu;
    }
}
