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
                if (res.data.list) {
                    res.data.list.forEach(item => {
                        const {content, tags} = this.getTagFromContent(item.content);
                        item.content = content;
                        this.sayList.push({
                            ...item,
                            tags,
                        });
                    });
                }
            }
            console.log(this.sayList);
        });
    }
    
    private getTagFromContent(content): { tags: string[], content: string } {
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
        this.getSayList();
    }
    
    loadMore() {
        this.sayList.push(...this.sayList);
    }
    
}
