import {Injectable} from '@angular/core';
import {PaginatorApiInterface, PaginatorInterface} from '../interface/paginator.interface';

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    
    /*-----Data Part-----*/
    
    /*-----Constructor Part-----*/
    
    constructor() {
    
    }
    
    /*-----Methods Part-----*/
    
    // 调接口前初始化接口翻页所需数据
    paginatorToApi(data: PaginatorInterface): PaginatorApiInterface {
        return {
            offset: (data.currentPage - 1) * data.pageSize,
            limit: data.pageSize,
            total: 0
        };
    }
}
