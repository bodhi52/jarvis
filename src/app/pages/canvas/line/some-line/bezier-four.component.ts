import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineObjInterface} from '../../../../core/interface/line.interface';
import Point from '../../../../util/point';
import Canvas from '../../../../util/canvas';
import BezierLine from '../../../../util/bezier-line';

interface CityDataInterface {
    point: Point;
    isShowLine: boolean;
    speed: number;
}

@Component({
    selector: 'app-line-bezier-four',
    template: `
        <canvas #canvas width="800" height="500">
            not support!
        </canvas>
    `
})
export class BezierFourComponent implements OnInit, AfterViewInit {
    
    
    @ViewChild('canvas') canvasDom: ElementRef;
    
    @Input() lineConfig;
    
    context: CanvasRenderingContext2D;
    
    lineArr: LineObjInterface[] = [];
    
    // 中心城市
    centerCity: Point = new Point(400, 250);
    /**
     * 城市数组，第一个默认为中心城市
     */
    cities: CityDataInterface[] = [
        {
            point: new Point(450, 280),
            isShowLine: true,
            speed: 1,
        },
        {
            point: new Point(100, 90),
            isShowLine: true,
            speed: 4,
        },
        {
            point: new Point(700, 400),
            isShowLine: true,
            speed: 4,
        },
        {
            point: new Point(600, 150),
            isShowLine: true,
            speed: 5,
        },
        {
            point: new Point(80, 450),
            isShowLine: true,
            speed: 5,
        },
    ];
    showLinePoint: number = 0.5;
    
    cityColor = (alpha) => 'rgba(255,255,255, ' + alpha + ')';
    
    constructor() {
    }
    
    ngOnInit() {
        this.init();
    }
    
    ngAfterViewInit(): void {
        this.context = this.canvasDom.nativeElement.getContext('2d');
        this.drawBg();
        this.drawLine();
        this.render();
    }
    
    private render() {
        this.drawBg();
        this.drawCity();
        this.drawLine();
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    
    init() {
        // 通过点生成线
        this.cities.forEach((city: CityDataInterface) => {
            if (!city.isShowLine) {
                return;
            }
            // 贝塞尔曲线
            const line = new BezierLine(this.centerCity, city.point);
            // 贝塞尔曲线的长度
            const len = Math.floor(line.getLength(1));
            
            const pointArr: Point[] = [];
            // 分割份数为曲线的长度
            for (let j = 0; j < len; j++) {
                let t = j / len;
                const l = t * len;
                t = line.invertL(t, l);
                
                const point = line.calculateBezierPointForQuadratic(t);
                
                pointArr.push(point);
            }
            this.lineArr.push({
                line,
                len,
                pointArr,
                cursor: 0,
                speed: city.speed,
                cityAlpha: 0,
                scale: 0,
            });
        });
    }
    
    drawLine() {
        this.lineArr.forEach(line => {
            // 当前线的总点数
            const allPointNumber = line.pointArr.length;
            // 计算当前line的展示的点的个数
            const showPointNumber = Math.floor(line.pointArr.length * this.showLinePoint);
            if (Math.floor(line.cursor + line.speed) >= allPointNumber + showPointNumber) {
                // 需要回退城市点的波动
                if (line.cursor >= allPointNumber + showPointNumber * 2) {
                    line.cursor = 0;
                    line.cityAlpha = 0;
                    line.scale = 0;
                } else {
                    // 消失的时候加快速度
                    line.cursor += line.speed * 1.3;
                    line.cityAlpha =  (line.cursor - allPointNumber) /  showPointNumber / 2;
                    return;
                }
            } else {
                line.cursor += line.speed;
            }
            // 计算游标
            const cursor = Math.floor(line.cursor);
            // 判断游标
            if (cursor < showPointNumber) {
                for (let i = 0; i < cursor; i++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
            } else if (cursor >= showPointNumber && cursor < allPointNumber) {
                for (let i = cursor - showPointNumber; i < cursor; i++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
            } else if (cursor >= allPointNumber && cursor < allPointNumber + showPointNumber) {
                // 当线触到点的时候渐变出现
                line.cityAlpha = (line.cursor - allPointNumber) /  showPointNumber / 2;
                line.scale = line.cityAlpha;
                for (let i = cursor - showPointNumber; i < allPointNumber; i++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
            }
        });
    }
    
    drawBg() {
        // 填充背景
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvasDom.nativeElement.width, this.canvasDom.nativeElement.height);
    }
    
    drawAllLine() {
        this.lineArr.forEach(line => {
            line.pointArr.forEach(p => {
                Canvas.drawCycle(this.context, p, 0.5, '#fff');
            });
        });
    }
    
    drawCity() {
        Canvas.drawCycle(this.context, this.centerCity, 15, this.cityColor(1));
        Canvas.drawCycle(this.context, this.centerCity, 8);
        
        for (const lineObj of this.lineArr) {
            const angle = lineObj.cityAlpha * Math.PI;
            Canvas.drawCycle(this.context, lineObj.line.end, 10 * (1 + lineObj.scale), this.cityColor(Math.sin(angle)));
            Canvas.drawCycle(this.context, lineObj.line.end, 5);
        }
    }
    
}
