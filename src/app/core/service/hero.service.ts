import {Injectable} from '@angular/core';
import {HeroInterface} from '../interface/hero.interface';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ApiUntilService} from '../api/api-until.service';
import {ApiUrlService} from '../api/api-url.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    
    private heroesUrl = 'api/heroes';
    
    constructor(
        private messageService: MessageService,
        private http: HttpClient,
        private apiUnit: ApiUntilService,
        private apiUrl: ApiUrlService,
    ) {
    }
    
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
    
    /**
     * 获得英雄列表
     */
    getHeroes() {
        // return this.apiUnit.get(this.apiUrl.api.hero.list);
        return Observable.create(observer => {
            const heroes: HeroInterface[] = [
                {
                    id: 1,
                    name: 'Iron Man',
                },
                {
                    id: 2,
                    name: 'Captain America',
                },
                {
                    id: 3,
                    name: 'Hulk',
                },
                {
                    id: 4,
                    name: 'Thor',
                },
                {
                    id: 5,
                    name: 'Black Widow',
                }
            ];
            observer.next({code: 0, data: heroes});
        });
    }
    
    /**
     * 获取详情
     * @param id
     */
    getHero(id: number) {
        return this.apiUnit.get(this.apiUrl.api.hero.detail, {id: id});
    }
    
    /**
     * 更新英雄
     * @param params
     */
    updateHero(params) {
        return this.apiUnit.post(this.apiUrl.api.hero.update, params);
    }
    
    /**
     * 添加英雄
     * @param params
     */
    addHero(params) {
        return this.apiUnit.post(this.apiUrl.api.hero.add, params);
    }
    
    /**
     * 删除英雄
     * @param params
     */
    deleteHero(params) {
        return this.apiUnit.post(this.apiUrl.api.hero.delete, params);
    }
    
    /**
     * 搜索英雄
     * @param params
     */
    searchHero(params) {
        return this.apiUnit.get(this.apiUrl.api.hero.search, params);
    }
}
