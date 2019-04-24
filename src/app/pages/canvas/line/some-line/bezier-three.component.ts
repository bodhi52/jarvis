import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineObjInterface} from '../../../../core/interface/line.interface';
import Point from '../../../../util/point';
import Canvas from '../../../../util/canvas';
import BezierLine from '../../../../util/bezier-line';

@Component({
    selector: 'app-line-bezier-three',
    template: `
        <canvas #canvas width="800" height="500">
            not support!
        </canvas>`
})
export class BezierThreeComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas') canvasDom: ElementRef;
    
    @Input() lineConfig;
    
    currentLine: LineObjInterface;
    
    // 中心城市
    centerCity: Point = new Point(400, 250);
    /**
     * 城市数组，第一个默认为中心城市
     */
    cities: Point[] = [
        new Point(100, 50),
        new Point(700, 400),
        new Point(600, 10),
        new Point(10, 480),
    ];
    
    // 数组最大长度
    MAX_LEN: number = 300;
    // 速度
    SPEED: number = 2; // 默认速度，如果线没有设定速度，默认以这个速度
    
    MIDDLE_LEN: number = 80;
    
    showCities: boolean = false;
    needSleep: boolean = false;
    
    context: CanvasRenderingContext2D;
    
    lineArr: LineObjInterface[] = [];
    
    static sleep(numberMillis) {
        const now = new Date();
        const exitTime = now.getTime() + numberMillis;
        while (true) {
            if (new Date().getTime() > exitTime) {
                return;
            }
        }
    }
    
    constructor() {
    }
    
    ngOnInit() {
        this.init();
    }
    
    
    ngAfterViewInit(): void {
        this.context = this.canvasDom.nativeElement.getContext('2d');
        this.drawBg();
        this.drawCity();
        this.render();
    
    }
    
    private render() {
        this.drawBg();
        
        this.drawLine();
        if (this.showCities) {
            this.drawCity();
        }
        window.requestAnimationFrame(this.render.bind(this));
    }
    
    init() {
        // 通过点生成线
        this.cities.forEach(city => {
            const line = new BezierLine(this.centerCity, city);
            const pointArr: Point[] = [];
            for (let j = 0; j < this.MAX_LEN; j ++) {
                const point = line.calculateBezierPointForQuadratic(j / this.MAX_LEN);
                pointArr.push(point);
            }
            this.lineArr.push({
                line,
                pointArr,
                cursor: 0,
            });
        });
    }
    
    drawLine() {
        let currentLoop = false;
        this.lineArr.forEach(line => {
            const cursor = Math.floor(line.cursor);
            // 判断游标
            if (cursor < this.MIDDLE_LEN) {
                for (let i = 0; i < cursor; i++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
            } else if (cursor >= this.MIDDLE_LEN && cursor < this.MAX_LEN) {
                for (let i = cursor - this.MIDDLE_LEN; i < cursor; i ++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
            } else if (cursor >= this.MAX_LEN && cursor < this.MAX_LEN + this.MIDDLE_LEN) {
                for (let i = cursor - this.MIDDLE_LEN; i < this.MAX_LEN; i ++) {
                    Canvas.drawCycle(this.context, line.pointArr[i], 1, '#fff');
                }
                this.showCities = true;
            }
            if (Math.floor(line.cursor + this.SPEED) >= this.MAX_LEN + this.MIDDLE_LEN) {
                line.cursor = 0;
                this.needSleep = true;
                currentLoop = true;
            } else {
                line.cursor += this.SPEED;
            }
        });
        if (this.needSleep && !currentLoop) {
            console.log('cursor', this.lineArr[0].cursor);
    
            BezierThreeComponent.sleep(500);
            this.needSleep = false;
        }
      
    }
    
    
    drawCity() {
        for (const p of this.cities) {
            Canvas.drawCycle(this.context, p, 5);
        }
    }
    
    drawBg() {
        // 填充背景
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvasDom.nativeElement.width, this.canvasDom.nativeElement.height);
        // 画出中心城市
        Canvas.drawCycle(this.context, this.centerCity, 5);
    }
}
