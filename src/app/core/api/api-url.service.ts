import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiUrlService {
    
    /**
     * 按照模块定义对应的请求路径
     */
    api = {
        hero: {
            list: '/hero/list',
            detail: '/hero/detail',
            update: '/hero/update',
            add: '/hero/add',
            delete: '/hero/delete',
        }
    };
    
    constructor(
    ) {
        for (const i of Object.keys(this.api)) {
            for (const key of Object.keys(this.api[i])) {
                this.api[i][key] = environment.apiUrl + this.api[i][key];
            }
        }
    }
}
