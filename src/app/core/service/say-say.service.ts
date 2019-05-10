import {Injectable} from '@angular/core';
import {ApiUntilService} from '../api/api-until.service';
import {ApiUrlService} from '../api/api-url.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/Http.interface';
import {SaySayInterface} from '../interface/say-say.interface';

@Injectable({
    providedIn: 'root',
})
export class SaySayService {
    constructor(
        private apiUntil: ApiUntilService,
        private apiUrl: ApiUrlService,
    ) {
    
    }
    
    /**
     * 列表
     */
    list(params: {
        page: number,
        limit: number,
    }): Observable<ResponseInterface<{list: SaySayInterface[], count: number}>> {
        return this.apiUntil.get(this.apiUrl.api.SaySay.list.url, params);
    }
    
    /**
     * 创建
     * @param params
     */
    create(params):  Observable<ResponseInterface<{}>>  {
        return this.apiUntil.post(this.apiUrl.api.SaySay.create.url, params);
    }
}
