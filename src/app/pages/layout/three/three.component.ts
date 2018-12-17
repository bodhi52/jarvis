import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-three',
    templateUrl: './three.component.html',
    styleUrls: ['./three.component.less']
})
export class ThreeComponent implements OnInit {
    
    menuList = [];
    
    constructor(
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        this.menuList = [
            {
                url: '',
                text: '基础练习',
                children: [
                    {
                        url: 'geometry-shape', text: '几何形状'
                    },
                    {
                        url: 'cube', text: 'Cube',
                    },
                    {
                        url: 'line', text: 'Line',
                    },
                    {
                        url: '3d-scene', text: '3DScene',
                    },
                    {
                        url: 'scene', text: '场景',
                    },
                    {
                        url: 'text', text: 'Text',
                    },
                    
                ],
            },
            {
                url: '',
                text: '粒子系统',
                children: [
                    {
                        url: 'particle', text: '粒子',
                    },
                ]
            },
            {
                url: '',
                text: '综合练习',
                children: [
                    {
                        url: 'geo', text: '地图geo',
                    },
                    {
                        url: 'aviator', text: '飞行员',
                    },
                    {
                        url: 'airplane',
                        text: '飞机',
                    },
                    {
                        url: 'china-map',
                        text: '中国地图',
                    },
                    {
                        url: 'earth',
                        text: '地球',
                    },
                    
                ],
            },
            {
                url: '',
                text: 'demo',
                children: [
                    {
                        url: 'r1-demo', text: 'R1 首页',
                    },
                    {
                        url: 'earth-geo',
                        text: '地球 官网'
                    }
                ]
            }
        
        ];
        
    }
    
    goUrl(url) {
        if (url) {
            this.router.navigate(['/three/' + url]);
        }
    }
}
