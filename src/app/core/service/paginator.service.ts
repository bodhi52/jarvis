import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginatorService {
    
    /*-----Data Part-----*/
    
    /*-----Constructor Part-----*/
    
    constructor() {
    
    }
    
    static isHaveNextPage(total: number, page: number, limit: number = 10): boolean {
        return total > page * limit;
    }
}
