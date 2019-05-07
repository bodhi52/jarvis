import {Injectable} from '@angular/core';
import {ApiUntilService} from '../api/api-until.service';
import {ApiUrlService} from '../api/api-url.service';
import {Observable} from 'rxjs';
import {ResponseInterface} from '../interface/Http.interface';

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
    list(): Observable<ResponseInterface> {
        return this.apiUntil.get(this.apiUrl.api.SaySay.list.url);
    }
    
    /**
     * 创建
     * @param params
     */
    create(params):  Observable<ResponseInterface>  {
        return this.apiUntil.post(this.apiUrl.api.SaySay.create.url, params);
    }
}
