import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import * as GIO from 'giojs';
import {ApiUntilService} from '../../../../core/api/api-until.service';

@Component({
    selector: 'app-earth',
    templateUrl: './earth.component.html',
    styleUrls: ['./earth.component.less'],
})
export class EarthComponent implements OnInit, AfterViewInit {
    
    constructor(
        private apiUnit: ApiUntilService,
    ) {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        // 获得用来来承载您的IO地球的容器
        const container = document.getElementById('globalArea');
        console.log(container);
        
        // 创建Gio控制器
        const controller = new GIO.Controller(container);
        
        /**
         * 添加数据
         * 了解更多有关Gio.js数据格式，查看文档：http://giojs.org/html/docs/dataIntro_zh.html
         * 我们提供了测试数据以供快速上手Gio.js，从该链接中获取测试数据: https://github.com/syt123450/giojs/blob/master/examples/data/sampleData.json
         */
        
        this.apiUnit.get('/assets/data/earth.json').subscribe(res => {
            console.log(res);
            controller.addData( res );
            // 初始化并渲染地球
            controller.init();
        });
    }
    
    
}
