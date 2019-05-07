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
        SaySay: {
            list: {
                url: '/say-say/list',
            },
            create: {
                url: '/say-say/create',
                params: {
                    content: '',
                }
            }
        }
    };
    
    constructor(
    ) {
        for (const i of Object.keys(this.api)) {
            for (const key of Object.keys(this.api[i])) {
                this.api[i][key].url = environment.apiUrl + this.api[i][key].url;
            }
        }
    }
}
