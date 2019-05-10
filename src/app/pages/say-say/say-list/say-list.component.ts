import {Component, OnInit} from '@angular/core';
import {SaySayInterface} from '../../../core/interface/say-say.interface';
import {SaySayService} from '../../../core/service/say-say.service';
import {ErrorCodeEnum} from '../../../core/enum/error-code.enum';
import {PaginatorService} from '../../../core/service/paginator.service';

@Component({
    selector: 'app-say-list',
    templateUrl: './say-list.component.html',
    styleUrls: ['./say-list.component.less']
})
export class SayListComponent implements OnInit {
    
    currentTag: string = '';
    
    currentPage: number = 1;
    limit: number = 10;
    
    isHaveMore: boolean = false;
    
    showCreate: boolean = false;
    
    sayList: SaySayInterface[] = [];
    
    private static getTagFromContent(content): { tags: string[], content: string } {
        const regex = /(##[^(##)]*##)/g;
        
        let tags = content.match(regex);
        if (tags && tags.length) {
            tags = tags.map(item => item.replace(/##/g, '#'));
        }
        console.log('tags', tags);
        content = content.replace(regex, '');
        return {
            tags,
            content,
        };
    }
    
    constructor(
        private sayApi: SaySayService,
    ) {
    }
    
    ngOnInit() {
        this.getSayList();
    }
    
    getSayList() {
        this.sayApi.list({
            page: this.currentPage,
            limit: this.limit,
        }).subscribe(res => {
            if (res.code === ErrorCodeEnum.SUCCESS) {
                if (res.data.list) {
                    res.data.list.forEach(item => {
                        const {content, tags} = SayListComponent.getTagFromContent(item.content);
                        item.content = content;
                        this.sayList.push({
                            ...item,
                            tags,
                        });
                    });
                }
                // 计算是否有下一页。
                this.isHaveMore = PaginatorService.isHaveNextPage(res.data.count, this.currentPage, this.limit);
            }
        });
    }
    
    saySome() {
        this.showCreate = true;
    }
    
    create(event: { type: 'cancel' | 'success' }) {
        this.showCreate = false;
        if (event.type === 'success') {
            this.sayList = [];
            this.getSayList();
        }
    }
    
    reload() {
        this.sayList = [];
        this.currentPage = 1;
        this.getSayList();
    }
    
    loadMore() {
        this.currentPage ++;
        this.getSayList();
    }
    
}
