import {Component, OnInit} from '@angular/core';
import {SaySayInterface} from '../../../core/interface/say-say.interface';

@Component({
    selector: 'app-say-list',
    templateUrl: './say-list.component.html',
    styleUrls: ['./say-list.component.less']
})
export class SayListComponent implements OnInit {

    currentTag: string = '';
    
    showCreate: boolean = false;
    
    sayList: SaySayInterface[] = [
        {
            id: 0,
            tags: ['闲聊'],
            content: '说点啥呢？这也算我在上海以来，自我骑车以来，甚至于自我记事以来的第一次车祸，说严重也不严重，只是割破了下巴，擦伤了身体，撞伤了胸膛，去医院缝针和输液。还没有至于伤筋动骨~',
            created_at: '1555125377216',
            user_id: '0',
            user_image: '../../../../assets/img/tony.jpeg',
            user_name: 'tony',
        },
        {
            id: 0,
            tags: ['闲聊', '心情'],
            content: '这下巴一点也不疼，就是影响我吃饭',
            created_at: '1555125377216',
            user_id: '0',
            user_image: '../../../../assets/img/iron-man.svg',
            user_name: 'tony',
        },
        {
            id: 0,
            tags: ['宠物'],
            content: '傻包子',
            created_at: '刚刚',
            images: ['../../../../assets/img/tony.jpeg', '../../../../assets/img/tony.jpeg', '../../../../assets/img/tony.jpeg', '../../../../assets/img/tony.jpeg', '../../../../assets/img/tony.jpeg', '../../../../assets/img/tony.jpeg'],
            user_id: '0',
            user_image: '../../../../assets/img/tony.jpeg',
            user_name: 'tony',
        },
        {
            id: 0,
            tags: ['闲聊', '心情'],
            content: '为什么要看飞驰人生？',
            created_at: '刚刚',
            user_id: '0',
            user_image: '../../../../assets/img/iron-man.svg',
            user_name: 'tony',
        },
        {
            id: 0,
            tags: ['闲聊', '心情'],
            content: '为什么要看飞驰人生？',
            created_at: '刚刚',
            user_id: '0',
            user_image: '../../../../assets/img/iron-man.svg',
            user_name: 'tony',
        },
    ];
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    saySome() {
        this.showCreate = true;
    }
    
    create(event: {type: 'cancel' | 'success'}) {
        if (event.type === 'cancel') {
            this.showCreate = false;
        }
    }
    
    loadMore() {
        this.sayList.push(...this.sayList);
    }
    
}
