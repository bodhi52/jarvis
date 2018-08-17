import {Injectable} from '@angular/core';
import {ApiUntilService} from './api-until.service';

@Injectable({
    providedIn: 'root'
})
export class CommonApiService {
    
    constructor(
        private apiUnit: ApiUntilService,
    ) {
    }
    
    login(params?) {
        return this.apiUnit.post('/admin/login', params);
    }
    
    
}
