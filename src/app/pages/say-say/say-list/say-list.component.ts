import {Component, OnInit} from '@angular/core';
import {SaySayInterface} from '../../../core/interface/say-say.interface';
import {SaySayService} from '../../../core/service/say-say.service';
import {ErrorCodeEnum} from '../../../core/enum/error-code.enum';

@Component({
    selector: 'app-say-list',
    templateUrl: './say-list.component.html',
    styleUrls: ['./say-list.component.less']
})
export class SayListComponent implements OnInit {

    currentTag: string = '';
    
    showCreate: boolean = false;
    
    sayList: SaySayInterface[] = [];
    
    constructor(
        private sayApi: SaySayService,
    ) {
    }
    
    ngOnInit() {
        this.getSayList();
    }
    
    getSayList() {
        this.sayApi.list().subscribe(res => {
            if (res.code === ErrorCodeEnum.SUCCESS) {
                if (res.data && res.data.length) {
                    res.data.forEach(item => {
                       this.sayList.push({
                           id: item.id,
                           content: item.content,
                           created_at: item.created_at,
                           user_id: '33',
                           user_name: 'tony',
                           user_image: '../../../../assets/img/iron-man.svg',
                       });
                    });
                }
            }
        });
    }
    
    saySome() {
        this.showCreate = true;
    }
    
    create(event: {type: 'cancel' | 'success'}) {
        this.showCreate = false;
        if (event.type === 'success') {
            this.sayList = [];
            this.getSayList();
        }
    }
    
    reload() {
        this.sayList = [];
        this.getSayList();
    }
    
    loadMore() {
        this.sayList.push(...this.sayList);
    }
    
}
